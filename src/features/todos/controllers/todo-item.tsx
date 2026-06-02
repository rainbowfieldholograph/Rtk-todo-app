import { memo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { type TodoId, todosSlice } from "../model/todos-slice";
import { TodoItemUi } from "../ui/todo-item";
import { TodoEditor } from "./todo-editor";

namespace TodoItemCompletedCheckbox {
  export type Props = { id: TodoId };
}

const TodoItemCompletedCheckbox = (props: TodoItemCompletedCheckbox.Props) => {
  const { id } = props;

  const completed = useAppSelector((state) =>
    todosSlice.selectors.todoCompleted(state, id),
  );
  const dispatch = useDispatch();

  if (completed === undefined) return null;

  const handleToggleCompleted = () => {
    dispatch(todosSlice.actions.toggleTodoCompleted({ id }));
  };

  return (
    <TodoItemUi.Checkbox
      completed={completed}
      onCompletedChange={handleToggleCompleted}
    />
  );
};

namespace TodoItemPinToggle {
  export type Props = { id: TodoId };
}

const TodoItemPinToggle = (props: TodoItemPinToggle.Props) => {
  const { id } = props;

  const pinned = useAppSelector((state) =>
    todosSlice.selectors.todoPinned(state, id),
  );
  const dispatch = useDispatch();

  const handlePinnedChange: TodoItemUi.PinToggle.Props["onPinnedChange"] = (
    updatedPinned,
  ) => {
    dispatch(
      todosSlice.actions.updateTodoPinned({ id, pinned: updatedPinned }),
    );
  };

  if (pinned === undefined) return null; // TODO: throw?

  return (
    <TodoItemUi.PinToggle onPinnedChange={handlePinnedChange} pinned={pinned} />
  );
};

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
      todoEditorSlot={<TodoEditor todo={todo} />}
      todoPinnedSlot={<TodoItemPinToggle id={id} />}
      updatedAt={updatedAt}
    />
  );
});

TodoItem.displayName = "TodoItem";

export { TodoItem };
