import { WorkspaceView } from "@/components/dashboard/workspace-view";
export default function RoadmapPage() {
  return (
    <WorkspaceView
      eyebrow="Roadmap"
      title="Turn direction into steady progress."
      description="Track the milestones that connect today's work to the bigger outcome."
      items={[
        {
          title: "Product beta",
          detail: "84% complete · On track",
          meta: "Jun 08",
        },
        {
          title: "Onboarding polish",
          detail: "62% complete · In progress",
          meta: "Jun 12",
        },
        {
          title: "Team insights",
          detail: "35% complete · Planned",
          meta: "Jun 19",
        },
      ]}
    />
  );
}
