import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { TodoItemCompletedCheckbox } from "./todo-item-completed-checkbox";

const TodoItemCompletedCheckboxWithState = () => {
  const [checked, setChecked] = useState(false);

  return (
    <TodoItemCompletedCheckbox
      completed={checked}
      onCompletedChange={setChecked}
    />
  );
};

describe("<TodoItemCompletedCheckbox />", () => {
  it("should render todo item completed checkbox", async () => {
    render(<TodoItemCompletedCheckboxWithState />);

    const user = userEvent.setup();

    const checkboxElement = screen.getByRole("checkbox", {
      name: /Задача выполнена:/i,
    });

    expect(checkboxElement).not.toBeChecked();

    await user.click(checkboxElement);
    expect(checkboxElement).toBeChecked();

    await user.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
  });
});
