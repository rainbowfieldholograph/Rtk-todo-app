import { memo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { todosSlice } from "../../model/todos-slice";
import { TodoListUi } from "../../ui/todo-list";

const TodoListSearch = memo(() => {
  const search = useAppSelector(todosSlice.selectors.search);
  const dispatch = useDispatch();
  const handleSearchChange: TodoListUi.Search.Props["onSearchChange"] = (
    search,
  ) => {
    dispatch(todosSlice.actions.updateSearch({ search: { value: search } }));
  };

  return (
    <TodoListUi.Search
      onSearchChange={handleSearchChange}
      search={search.value}
    />
  );
});

TodoListSearch.displayName = "TodoListSearch";

export { TodoListSearch };
