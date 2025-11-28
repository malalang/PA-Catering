import { DashboardShell } from "@/components/layout/DashboardShell";

export default function SettingsPage() {
  return (
    <DashboardShell
      title="Workspace settings"
      description="Configure notification channels and escalation defaults."
    >
      <div className="space-y-4 text-sm text-yellow-300">
        <div className="rounded-2xl border border-white/10 bg-yellow-900/40 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
            Notifications
          </p>
          <p className="mt-2 text-white">
            Ops alerts sent to #war-room (Teams)
          </p>
          <p>
            Email digests go to ops@pacatering.co.za every morning at 06:00.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-yellow-900/40 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
            Escalations
          </p>
          <p className="mt-2 text-white">On-call: Nomsa Nkosi</p>
          <p>Backup: Lesedi Moagi</p>
        </div>
      </div>
    </DashboardShell>
  );
}

