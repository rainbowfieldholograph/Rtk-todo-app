import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { type TodoId, todosSlice } from "../../model/todos-slice";
import { TodoItemUi } from "../../ui/todo-item";

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

export { TodoItemCompletedCheckbox };
