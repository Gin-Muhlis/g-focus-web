import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "App",
};

export default function AppHomePage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <Badge variant="blue">Design foundation</Badge>
          <h1 className="text-4xl font-semibold leading-tight text-foreground">
            Today
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            The authenticated app shell is ready for dense todo, planning,
            dashboard, roadmap, and focus features in the next tasks.
          </p>
        </div>
        <Button variant="secondary">Quick add placeholder</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Open todos</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="neutral">Ready for FEAT-007</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Focus blocks</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="violet">Ready for FEAT-011</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Planned milestones</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="success">Ready for FEAT-010</Badge>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        title="Feature data is not connected yet"
        description="This foundation shows shared surfaces, status chips, buttons, and empty states without introducing business logic ahead of the feature cards."
        action={<Button variant="ghost">View upcoming workflow</Button>}
      />
    </section>
  );
}
