import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

type SearchParams = {
  error?: string;
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <AuthShell
      title="Invite-only registration"
      description="Only trusted operations staff should create new admin accounts."
      footer={
        <p>
          Already onboarded?{" "}
          <Link
            href="/login"
            className="text-indigo-300 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm initialError={searchParams?.error} />
    </AuthShell>
  );
}

