import { WorkspaceView } from "@/components/dashboard/workspace-view";
export default function SettingsPage() {
  return (
    <WorkspaceView
      eyebrow="Workspace settings"
      title="Shape a workspace that stays useful."
      description="Keep your planning rhythm, focus preferences, and workspace context aligned."
      items={[
        {
          title: "Growth Studio",
          detail: "Personal workspace",
          meta: "Active",
        },
        {
          title: "Daily focus goal",
          detail: "Three focused sessions",
          meta: "150 min",
        },
        { title: "Week starts", detail: "Planning preference", meta: "Monday" },
      ]}
    />
  );
}
