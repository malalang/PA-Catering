import { DashboardShell } from "@/components/layout/DashboardShell";

export default function SupportPage() {
  return (
    <DashboardShell
      title="Ops support"
      description="Get help from leadership or open a ticket with the tech team."
    >
      <div className="space-y-4 text-sm text-slate-300">
        <p>Need assistance? Reach out via the following channels:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Email: ops@pacatering.co.za</li>
          <li>WhatsApp: +27 60 555 0101</li>
          <li>Escalations: #ops-war-room (Teams)</li>
        </ul>
      </div>
    </DashboardShell>
  );
}

