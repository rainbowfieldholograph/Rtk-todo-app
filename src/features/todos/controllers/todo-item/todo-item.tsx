import { memo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { type TodoId, todosSlice } from "../../model/todos-slice";
import { TodoItemUi } from "../../ui/todo-item";
import { TodoEditor } from "../todo-editor";
import { TodoItemCompletedCheckbox } from "./todo-item-completed-checkbox";
import { TodoItemPinToggle } from "./todo-item-pin-toggle";

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

  const { createdAt, description, title, updatedAt } = todo;

  const handleRemove = () => {
    dispatch(todosSlice.actions.removeTodo({ id }));
  };

  return (
    <TodoItemUi.Root
      createdAt={createdAt}
      description={description}
      onRemove={handleRemove}
      title={title}
      todoCompletedSlot={<TodoItemCompletedCheckbox id={id} />}
      todoEditorSlot={<TodoEditor id={id} />}
      todoPinnedSlot={<TodoItemPinToggle id={id} />}
      updatedAt={updatedAt}
    />
  );
});

TodoItem.displayName = "TodoItem";

export { TodoItem };
