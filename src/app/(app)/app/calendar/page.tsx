import { WorkspaceView } from "@/components/dashboard/workspace-view";
export default function CalendarPage() {
  return (
    <WorkspaceView
      eyebrow="Schedule"
      title="Protect time for what matters."
      description="Balance commitments with deliberate focus blocks across the week."
      items={[
        {
          title: "Launch narrative focus block",
          detail: "Today · Deep work",
          meta: "09:30",
        },
        {
          title: "Product design review",
          detail: "Today · Team",
          meta: "11:00",
        },
        {
          title: "Beta readiness sync",
          detail: "Tomorrow · Milestone",
          meta: "10:00",
        },
      ]}
    />
  );
}
