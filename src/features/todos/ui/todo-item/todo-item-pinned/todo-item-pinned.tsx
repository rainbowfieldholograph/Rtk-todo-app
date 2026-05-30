import { Pin } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

import { Button } from "~/shared/ui/kit/button";

import styles from "./todo-item-pinned.module.css";

namespace TodoItemPinned {
  export type Props = {
    onPinnedChange: (pinned: boolean) => void;
    pinned: boolean;
  };
}

const TodoItemPinned = (props: TodoItemPinned.Props) => {
  const { onPinnedChange, pinned } = props;

  const handlePinnedChange = () => {
    onPinnedChange(!pinned);
  };

  return (
    <Button onClick={handlePinnedChange} size="icon" variant="ghost">
      <HugeiconsIcon
        className={clsx(styles.icon, { [styles.pinned!]: pinned })}
        icon={Pin}
      />
    </Button>
  );
};

export { TodoItemPinned };
