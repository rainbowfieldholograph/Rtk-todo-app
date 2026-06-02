import { Pin } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

import { Toggle } from "~/shared/ui/kit/toggle";

import styles from "./todo-item-pin-toggle.module.css";

namespace TodoItemPinToggle {
  export type Props = {
    onPinnedChange: (pinned: boolean) => void;
    pinned: boolean;
  };
}

const TodoItemPinToggle = (props: TodoItemPinToggle.Props) => {
  const { onPinnedChange, pinned } = props;

  const handlePinnedChange = () => onPinnedChange(!pinned);

  return (
    <Toggle
      aria-label="Переключить закрепление задачи"
      onPressedChange={handlePinnedChange}
      pressed={pinned}
    >
      <HugeiconsIcon
        className={clsx(styles.icon, { [styles.pinned!]: pinned })}
        icon={Pin}
      />
    </Toggle>
  );
};

export { TodoItemPinToggle };
