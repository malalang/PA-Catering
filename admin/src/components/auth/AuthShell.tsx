import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const AuthShell = ({ title, description, children, footer }: Props) => (
  <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-white shadow-2xl backdrop-blur">
    <div className="space-y-2 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-slate-300">{description}</p>
    </div>

    <div className="mt-6">{children}</div>

    {footer ? (
      <div className="mt-6 text-center text-sm text-slate-400">{footer}</div>
    ) : null}
  </div>
);

