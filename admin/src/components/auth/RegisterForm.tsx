"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import type { AuthActionState } from "@/lib/auth";
import { registerAction } from "@/lib/auth";

type Props = {
  initialError?: string;
};

export const RegisterForm = ({ initialError }: Props) => {
  const [state, formAction] = useFormState<AuthActionState, FormData>(
    registerAction,
    {
      error: initialError,
    },
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-yellow-300" htmlFor="fullName">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Nomsa Nkosi"
          className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-4 py-2 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-yellow-300" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@pacatering.co.za"
          className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-4 py-2 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-yellow-300" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Create a strong password"
          className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-4 py-2 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-yellow-300" htmlFor="inviteCode">
          Invite code
        </label>
        <input
          id="inviteCode"
          name="inviteCode"
          type="password"
          placeholder="Required if set by Ops"
          className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-4 py-2 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-rose-400">{state.error}</p>
      ) : null}

      <SubmitButton
        label="Create admin account"
        loadingLabel="Creating account..."
      />
    </form>
  );
};

