import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { TodoItemPinToggle } from "./todo-item-pin-toggle";

const TodoItemPinToggleWithState = () => {
  const [pinned, setPinned] = useState(false);

  return (
    <TodoItemPinToggle
      onPinnedChange={() => setPinned((state) => !state)}
      pinned={pinned}
    />
  );
};

describe("<TodoItemPinToggle />", () => {
  it("should render component and toggle state", async () => {
    const user = userEvent.setup();

    render(<TodoItemPinToggleWithState />);

    const buttonNode = screen.getByRole("button", { pressed: false });
    expect(buttonNode).toBeVisible();

    await user.click(buttonNode);
    expect(buttonNode).toHaveAttribute("aria-pressed", "true");
  });
});
