import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { TodoListSearch } from "./todo-list-search";

const getSearchInput = () => {
  return screen.getByRole("textbox", {
    name: /поиск задачи:/i,
  });
};

const TodoListSearchWithState = () => {
  const [search, setSearch] = useState("");

  return <TodoListSearch onSearchChange={setSearch} search={search} />;
};

describe("<TodoListSearch />", () => {
  it("should call onSearchChange when user types", async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();

    render(<TodoListSearch onSearchChange={handleSearchChange} search="" />);

    const searchInputNode = getSearchInput();

    const inputValue = "Hi!";
    await user.type(searchInputNode, inputValue);
    inputValue.split("").forEach((char) => {
      expect(handleSearchChange).toHaveBeenCalledWith(char);
    });
  });

  it("should delete character at the end with backspace", async () => {
    const user = userEvent.setup();
    render(<TodoListSearchWithState />);
    const searchInputNode = getSearchInput();

    let inputValue = "Testing!";
    await user.type(searchInputNode, inputValue);
    expect(searchInputNode).toHaveValue(inputValue);

    await user.keyboard("{Backspace}");
    inputValue = inputValue.slice(0, -1);
    expect(searchInputNode).toHaveValue(inputValue);

    await user.keyboard("{Backspace}");
    inputValue = inputValue.slice(0, -1);
    expect(searchInputNode).toHaveValue(inputValue);
  });

  it("should delete character in the middle", async () => {
    const user = userEvent.setup();
    render(<TodoListSearchWithState />);
    const searchInputNode = getSearchInput();

    let inputValue = "Testing!!";
    await user.type(searchInputNode, inputValue);
    expect(searchInputNode).toHaveValue(inputValue);

    const middleIndex = Math.floor(inputValue.length / 2);
    for (let i = 0; i < middleIndex; i++) {
      await user.keyboard("{ArrowLeft}");
    }

    await user.keyboard("{Backspace}");

    inputValue = inputValue.split("").toSpliced(middleIndex, 1).join("");
    expect(searchInputNode).toHaveValue(inputValue);

    inputValue = inputValue
      .split("")
      .toSpliced(middleIndex - 1, 1)
      .join("");
    await user.keyboard("{Backspace}");
    expect(searchInputNode).toHaveValue(inputValue);
  });
});
