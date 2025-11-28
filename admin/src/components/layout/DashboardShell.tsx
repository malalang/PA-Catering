import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export const DashboardShell = ({
  title,
  description,
  actions,
  children,
}: Props) => (
  <section className="space-y-6 rounded-2xl border border-white/5 bg-yellow-900/40 p-6 shadow-inner shadow-black/20">
    <header className="flex flex-col gap-2 border-b border-white/5 pb-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="text-sm text-yellow-400">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex items-center gap-3">{actions}</div>
      ) : null}
    </header>

    <div>{children}</div>
  </section>
);

