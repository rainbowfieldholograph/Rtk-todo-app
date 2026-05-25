import { type ReactNode } from "react";

import { dateTimeFormatter } from "~/shared/lib/date";
import { Button } from "~/shared/ui/kit/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/kit/card";

import styles from "./todo-item-root.module.css";

namespace TodoItemRoot {
  export type Props = {
    createdAt: string;
    description: string;
    onRemove: () => void;
    title: string;
    todoCompletedSlot: ReactNode;
    todoEditorSlot: ReactNode;
    updatedAt: string;
  };
}

const TodoItemRoot = (props: TodoItemRoot.Props) => {
  const {
    createdAt,
    description,
    onRemove,
    title,
    todoCompletedSlot,
    todoEditorSlot,
    updatedAt,
  } = props;

  const isUpdated = updatedAt !== createdAt;
  const createdAtFormatted = dateTimeFormatter.format(new Date(createdAt));
  const updatedAtFormatted = isUpdated
    ? dateTimeFormatter.format(new Date(updatedAt))
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{description}</div>
        <div>
          Дата создания: <time dateTime={createdAt}>{createdAtFormatted}</time>
        </div>
        {updatedAtFormatted ? (
          <div>
            Дата обновления:{" "}
            <time dateTime={updatedAt}>{updatedAtFormatted}</time>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <div className={styles.footerStart}>
          <Button onClick={onRemove} variant="destructive">
            Удалить
          </Button>
          {todoEditorSlot}
        </div>
        <div className={styles.completionCheckbox}>{todoCompletedSlot}</div>
      </CardFooter>
    </Card>
  );
};

export { TodoItemRoot };
