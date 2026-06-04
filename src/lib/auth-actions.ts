"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getRequestIp, isRateLimited } from "@/lib/auth-rate-limit";
import {
  createSession,
  deleteCurrentSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export type AuthActionState = {
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .transform((email) => email.toLowerCase());

const bcryptPasswordSchema = z
  .string()
  .refine(
    (password) => Buffer.byteLength(password, "utf8") <= 72,
    "Password must be no more than 72 UTF-8 bytes.",
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .pipe(bcryptPasswordSchema);

const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Enter your password.")
    .pipe(bcryptPasswordSchema),
});

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be no more than 80 characters."),
  email: emailSchema,
  password: passwordSchema,
});

function validationState(error: z.ZodError): AuthActionState {
  return {
    message: "Check the highlighted fields and try again.",
    errors: error.flatten().fieldErrors,
  };
}

async function authRequestIsRateLimited(
  action: "login" | "register",
  email: string,
) {
  const ip = await getRequestIp();
  const windowMs = action === "login" ? 15 * 60 * 1000 : 60 * 60 * 1000;
  const ipLimit = action === "login" ? 20 : 5;
  const accountLimit = action === "login" ? 8 : 3;

  const [ipLimited, accountLimited] = await Promise.all([
    isRateLimited({
      scope: `${action}:ip`,
      identifier: ip,
      limit: ipLimit,
      windowMs,
    }),
    isRateLimited({
      scope: `${action}:account`,
      identifier: email,
      limit: accountLimit,
      windowMs,
    }),
  ]);

  return ipLimited || accountLimited;
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return validationState(result.error);
  }

  if (await authRequestIsRateLimited("login", result.data.email)) {
    return { message: "Too many attempts. Wait a while and try again." };
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (
    !user ||
    !(await verifyPassword(result.data.password, user.passwordHash))
  ) {
    return { message: "Email or password is incorrect." };
  }

  await createSession(user.id);
  redirect("/app");
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return validationState(result.error);
  }

  if (await authRequestIsRateLimited("register", result.data.email)) {
    return { message: "Too many attempts. Wait a while and try again." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      message: "An account already exists for this email.",
      errors: { email: ["Use a different email or sign in instead."] },
    };
  }

  const passwordHash = await hashPassword(result.data.password);

  let user: { id: string };

  try {
    user = await prisma.$transaction(async (transaction) => {
      const createdUser = await transaction.user.create({
        data: {
          name: result.data.name,
          email: result.data.email,
          passwordHash,
        },
      });

      await transaction.workspace.create({
        data: {
          name: `${createdUser.name}'s Workspace`,
          ownerId: createdUser.id,
          members: {
            create: {
              userId: createdUser.id,
              role: "owner",
            },
          },
        },
      });

      return createdUser;
    });
  } catch {
    return {
      message:
        "We could not create your account. Check your details and try again.",
    };
  }

  try {
    await createSession(user.id);
  } catch {
    return {
      message:
        "Your account was created, but we could not sign you in. Sign in to continue.",
    };
  }

  redirect("/app");
}

export async function logoutAction() {
  await deleteCurrentSession();
  redirect("/sign-in");
}
