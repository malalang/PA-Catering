import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

type SearchParams = {
  redirectTo?: string;
  registered?: string;
  error?: string;
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const redirectTo = searchParams?.redirectTo;
  const registered = searchParams?.registered === "1";
  const error = searchParams?.error;

  const initialMessage = registered
    ? "Account created successfully. You can sign in now."
    : undefined;
  const description =
    error === "not_authorized"
      ? "Your account lacks admin permissions. Contact Operations for access."
      : "Access internal dashboards to manage menus, orders, and logistics.";

  return (
    <AuthShell
      title="Admin sign in"
      description={description}
      footer={
        <p>
          Need access?{" "}
          <Link
            href="/register"
            className="text-indigo-300 underline-offset-4 hover:underline"
          >
            Request an admin account
          </Link>
        </p>
      }
    >
      <LoginForm redirectTo={redirectTo} initialMessage={initialMessage} />
    </AuthShell>
  );
}

