import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { dateTimeFormatter } from "~/shared/lib/date";

import type { Todo } from "../../../model/todos-slice";

import { TodoItemRoot } from "./todo-item-root";

const todo: Todo = {
  completed: false,
  createdAt: "2026-05-05T09:15:00.000Z",
  description: "Description",
  id: "0",
  pinned: false,
  title: "Title",
  updatedAt: "2026-05-07T11:20:00.000Z",
};

describe("<TodoItemRoot />", () => {
  it("should render todo content and datetime values", () => {
    render(
      <TodoItemRoot
        createdAt={todo.createdAt}
        description={todo.description}
        onRemove={vi.fn()}
        title={todo.title}
        todoCompletedSlot={null}
        todoEditorSlot={null}
        todoPinnedSlot={null}
        updatedAt={todo.updatedAt}
      />,
    );

    const createdAtFormatted = dateTimeFormatter.format(
      new Date(todo.createdAt),
    );
    const updatedAtFormatted = dateTimeFormatter.format(
      new Date(todo.updatedAt),
    );

    const createdAtContainer = screen.getByText(/Дата создания:/i);
    const updatedAtContainer = screen.getByText(/Дата обновления:/i);

    const createdAtTimeElement = within(createdAtContainer).getByText(
      createdAtFormatted,
      { exact: false },
    );
    const updatedAtTimeElement = within(updatedAtContainer).getByText(
      updatedAtFormatted,
      { exact: false },
    );

    expect(createdAtTimeElement.tagName).toBe("TIME");
    expect(updatedAtTimeElement.tagName).toBe("TIME");

    expect(createdAtTimeElement).toHaveAttribute("datetime", todo.createdAt);
    expect(updatedAtTimeElement).toHaveAttribute("datetime", todo.updatedAt);

    expect(screen.getByText(todo.title)).toBeInTheDocument();
    expect(screen.getByText(todo.description)).toBeInTheDocument();
  });
});
