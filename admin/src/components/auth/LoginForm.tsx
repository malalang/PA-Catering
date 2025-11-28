"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import type { AuthActionState } from "@/lib/auth";
import { loginAction } from "@/lib/auth";

type Props = {
  redirectTo?: string;
  initialMessage?: string;
};

const initialState: AuthActionState = {};

export const LoginForm = ({ redirectTo, initialMessage }: Props) => {
  const [state, formAction] = useFormState(loginAction, {
    ...initialState,
    message: initialMessage,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="hidden"
        name="redirectTo"
        value={redirectTo ?? "/dashboard"}
      />
      <div className="space-y-2">
        <label className="text-sm text-yellow-300" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-4 py-2 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          placeholder="you@pacatering.co.za"
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
          className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-4 py-2 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          placeholder="••••••••"
        />
      </div>

      {(state.error || state.message) && (
        <p
          className={`text-sm ${state.error ? "text-rose-400" : "text-emerald-400"}`}
        >
          {state.error ?? state.message}
        </p>
      )}

      <SubmitButton label="Sign in" loadingLabel="Signing in..." />
    </form>
  );
};

