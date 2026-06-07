import { memo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { todosSlice } from "../../model/todos-slice";
import { TodoListUi } from "../../ui/todo-list";

const TodoListSort = memo(() => {
  const selectedSort = useAppSelector(todosSlice.selectors.selectedSort);
  const dispatch = useDispatch();

  const handleSelectedSortChange: TodoListUi.Sort.Props["onSelectedSortChange"] =
    (sort) => {
      if (!sort) return;
      dispatch(todosSlice.actions.changeSort({ sort }));
    };

  return (
    <TodoListUi.Sort
      onSelectedSortChange={handleSelectedSortChange}
      selectedSort={selectedSort}
    />
  );
});

TodoListSort.displayName = "TodoListSort";

export { TodoListSort };
