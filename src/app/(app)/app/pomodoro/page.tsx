import { WorkspaceView } from "@/components/dashboard/workspace-view";
export default function PomodoroPage() {
  return (
    <WorkspaceView
      eyebrow="Focus room"
      title="One target. One protected block."
      description="Give the next meaningful task your full attention and let everything else wait."
      items={[
        {
          title: "Launch narrative",
          detail: "Current focus target",
          meta: "50 min",
        },
        { title: "Prototype review", detail: "Next in queue", meta: "25 min" },
        { title: "Weekly update", detail: "Later today", meta: "25 min" },
      ]}
    />
  );
}
