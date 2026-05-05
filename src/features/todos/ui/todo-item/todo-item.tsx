import { useDispatch } from "react-redux";
import { Button } from "~/shared/ui/kit/button";
import { todosSlice, type Todo } from "../../model/todos-slice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/kit/card";
import { TodoEditor } from "../todo-editor";
import styles from "./todo-item.module.css";
import { TodoCompletedCheckbox } from "./todo-completed-checkbox";

namespace TodoItem {
  export type Props = { todo: Todo };
}

const TodoItem = (props: TodoItem.Props) => {
  const { todo } = props;
  const { id, title, description } = todo;

  const dispatch = useDispatch();

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
      </CardContent>
      <CardFooter className={styles.footerActions}>
        <Button variant="destructive" onClick={handleRemove}>
          Удалить
        </Button>
        <TodoEditor todo={todo} />
        <TodoCompletedCheckbox id={todo.id} />
      </CardFooter>
    </Card>
  );
};

export { TodoItem };
