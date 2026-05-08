import { useDispatch } from "react-redux";
import { Button } from "~/shared/ui/kit/button";
import { todosSlice, type TodoId } from "../../model/todos-slice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/kit/card";
import { TodoEditor } from "../todo-editor";
import { TodoCompletedCheckbox } from "./todo-completed-checkbox";
import { dateTimeFormatter } from "~/shared/lib/date";
import { useAppSelector } from "~/shared/redux";
import { memo } from "react";
import styles from "./todo-item.module.css";

namespace TodoItem {
  export type Props = { id: TodoId };
}

const TodoItem = memo((props: TodoItem.Props) => {
  const { id } = props;
  const todo = useAppSelector((state) =>
    todosSlice.selectors.todoById(state, id),
  );
  const dispatch = useDispatch();

  if (!todo) {
    throw new Error(`TodoItem component error. Todo with id ${id} not found.`);
  }

  const { updatedAt, createdAt, title, description } = todo;

  const isUpdated = updatedAt !== createdAt;
  const createdAtFormatted = dateTimeFormatter.format(new Date(createdAt));
  const updatedAtFormatted = isUpdated
    ? dateTimeFormatter.format(new Date(updatedAt))
    : null;

  const handleRemove = () => {
    dispatch(todosSlice.actions.removeTodo({ id }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{description}</div>
        <div>Дата создания задачи: {createdAtFormatted}</div>
        {updatedAtFormatted ? (
          <div>Дата обновления задачи: {updatedAtFormatted}</div>
        ) : null}
      </CardContent>
      <CardFooter>
        <div className={styles.footerStart}>
          <Button variant="destructive" onClick={handleRemove}>
            Удалить
          </Button>
          <TodoEditor todo={todo} />
        </div>
        <div className={styles.completionCheckbox}>
          <TodoCompletedCheckbox id={todo.id} />
        </div>
      </CardFooter>
    </Card>
  );
});

TodoItem.displayName = "TodoItem";

export { TodoItem };
