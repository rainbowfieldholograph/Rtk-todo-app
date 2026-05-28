import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TodoListRoot } from "./todo-list-root";

describe("<TodoListRoot/> ", () => {
  it("should render todo list slots", () => {
    const searchSlot = <div>Search slot</div>;
    const sortSlot = <div>Sort slot</div>;
    const titleSlot = <div>Title slot</div>;

    render(
      <TodoListRoot
        searchSlot={searchSlot}
        sortSlot={sortSlot}
        titleSlot={titleSlot}
      />,
    );

    const todoListNode = screen.getByRole("list");
    const searchSlotNode = screen.getByText("Search slot");
    const sortSlotNode = screen.getByText("Sort slot");
    const titleSlotNode = screen.getByText("Title slot");

    expect(todoListNode).toBeVisible();
    expect(searchSlotNode).toBeVisible();
    expect(sortSlotNode).toBeVisible();
    expect(titleSlotNode).toBeVisible();
  });

  it("should not render nullable slots", () => {
    render(<TodoListRoot searchSlot={null} sortSlot={null} titleSlot={null} />);

    const searchSlotNode = screen.queryByText("Search slot");
    const sortSlotNode = screen.queryByText("Sort slot");
    const titleSlotNode = screen.queryByText("Title slot");

    expect(searchSlotNode).not.toBeInTheDocument();
    expect(sortSlotNode).not.toBeInTheDocument();
    expect(titleSlotNode).not.toBeInTheDocument();
  });

  it("should render children as list items", () => {
    const todoListItems = [
      <div key={0}>Child</div>,
      <div key={1}>Child</div>,
      <div key={2}>Child</div>,
    ];

    render(
      <TodoListRoot searchSlot={null} sortSlot={null} titleSlot={null}>
        {todoListItems}
      </TodoListRoot>,
    );

    const listNode = screen.getByRole("list");

    expect(within(listNode).getAllByRole("listitem")).toHaveLength(3);
  });
});
