"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  loadingLabel?: string;
  className?: string;
};

export const SubmitButton = ({
  label,
  loadingLabel = "Working...",
  className,
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-60 ${className ?? ""}`}
    >
      {pending ? loadingLabel : label}
    </button>
  );
};

