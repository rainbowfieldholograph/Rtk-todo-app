import { useDispatch } from "react-redux";
import { Button } from "~/shared/ui/kit/button";
import { todosSlice, type Todo } from "../model/todos-slice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/kit/card";

namespace TodoItem {
  export type Props = {
    todo: Todo;
  };
}

const TodoItem = (props: TodoItem.Props) => {
  const { todo } = props;
  const { id, title, description, completed } = todo;

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
        <div>Выполнено: {completed ? "Да" : "Нет"}</div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleRemove}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TodoItem };
