import { expect, test } from "@playwright/test";

test.describe("workspace todo management", () => {
  test("creates, edits, completes, uncompletes, and deletes a scoped todo", async ({
    page,
  }) => {
    const runId = Date.now();
    const email = `todo-e2e-${runId}@example.test`;
    const password = "E2ePassword123!";
    const originalTitle = `Write launch plan ${runId}`;
    const editedTitle = `Review launch plan ${runId}`;

    await page.goto("/register");
    await page.getByLabel("Name").fill("Todo E2E User");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL(/\/app/);
    await page.goto("/app/today");

    await page.getByLabel("Title").fill(originalTitle);
    await page
      .getByLabel("Notes")
      .fill("Capture the E2E note before editing the todo.");
    await page.getByLabel("Priority").selectOption("urgent");
    await page.getByLabel("Due date").fill("2026-06-09");
    await page.getByLabel("Labels").fill("launch, writing");
    await page.getByRole("button", { name: "Create todo" }).click();

    const todo = page.getByRole("article").filter({ hasText: originalTitle });
    const todoMeta = todo.locator('[data-testid="todo-metadata"]');
    await expect(todo).toBeVisible();
    await expect(todo.locator('[data-testid="todo-priority"]')).toHaveText(
      "Urgent",
    );
    await expect(todoMeta.getByText("launch")).toBeVisible();
    await expect(todoMeta.getByText("writing")).toBeVisible();
    await expect(todoMeta.getByText("Due Jun 9")).toBeVisible();

    await todo.getByText("Edit todo").click();
    await todo.getByLabel("Title").fill(editedTitle);
    await todo.getByLabel("Notes").fill("Edited E2E note with metadata kept.");
    await todo.getByLabel("Status").selectOption("in_progress");
    await todo.getByLabel("Priority").selectOption("high");
    await todo.getByLabel("Labels").fill("review, launch");
    await todo.getByRole("button", { name: "Save changes" }).click();

    const editedTodo = page
      .getByRole("article")
      .filter({ hasText: editedTitle });
    const editedMeta = editedTodo.locator('[data-testid="todo-metadata"]');
    await expect(editedTodo).toBeVisible();
    await expect(
      editedTodo.locator('[data-testid="todo-priority"]'),
    ).toHaveText("High");
    await expect(editedTodo.locator('[data-testid="todo-status"]')).toHaveText(
      "In progress",
    );
    await expect(editedMeta.getByText("review")).toBeVisible();
    await expect(editedMeta.getByText("launch")).toBeVisible();

    await editedTodo
      .getByRole("button", { name: "Mark todo complete" })
      .click();
    await expect(editedTodo.locator('[data-testid="todo-status"]')).toHaveText(
      "Done",
    );
    await expect(
      editedTodo.locator('[data-testid="todo-priority"]'),
    ).toHaveText("High");
    await expect(editedMeta.getByText("review")).toBeVisible();

    await editedTodo
      .getByRole("button", { name: "Mark todo incomplete" })
      .click();
    await expect(editedTodo.locator('[data-testid="todo-status"]')).toHaveText(
      "Todo",
    );
    await expect(
      editedTodo.locator('[data-testid="todo-priority"]'),
    ).toHaveText("High");
    await expect(editedMeta.getByText("review")).toBeVisible();

    await editedTodo
      .getByRole("button", { name: `Delete ${editedTitle}` })
      .click();
    await expect(page.getByText(editedTitle)).toHaveCount(0);
  });
});
