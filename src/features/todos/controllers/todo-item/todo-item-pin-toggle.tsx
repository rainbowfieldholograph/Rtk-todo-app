import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { type TodoId, todosSlice } from "../../model/todos-slice";
import { TodoItemUi } from "../../ui/todo-item";

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

export { TodoItemPinToggle };
