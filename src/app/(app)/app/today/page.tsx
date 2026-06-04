import { WorkspaceView } from "@/components/dashboard/workspace-view";
export default function TodayPage() {
  return (
    <WorkspaceView
      eyebrow="Thursday's plan"
      title="A focused, realistic day."
      description="Keep the important work visible and leave enough room to finish it well."
      items={[
        {
          title: "Finalize launch narrative",
          detail: "Deep work · High priority",
          meta: "09:30",
        },
        {
          title: "Review onboarding prototype",
          detail: "Design · Medium priority",
          meta: "11:00",
        },
        {
          title: "Prepare weekly project update",
          detail: "Workspace · Medium priority",
          meta: "14:30",
        },
      ]}
    />
  );
}
