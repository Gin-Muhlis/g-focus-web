"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
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

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be no more than 72 characters.");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
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

  try {
    const user = await prisma.$transaction(async (transaction) => {
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

    await createSession(user.id);
  } catch {
    return {
      message:
        "We could not create your account. Check your details and try again.",
    };
  }

  redirect("/app");
}

export async function logoutAction() {
  await deleteCurrentSession();
  redirect("/sign-in");
}
