export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      {children}
    </main>
  );
}
