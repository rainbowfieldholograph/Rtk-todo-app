import { memo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { todosSlice } from "../model/todos-slice";
import { TodoListUi } from "../ui/todo-list";
import { TodoItem } from "./todo-item";

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

const TodoListSort = memo(() => {
  const selectedSort = useAppSelector(todosSlice.selectors.selectedSort);
  const dispatch = useDispatch();

  const handleSelectedSortChange: TodoListUi.Sort.Props["onSelectedSortChange"] =
    ({ sort }) => {
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

const TodoListTitle = memo(() => {
  const todosCount = useAppSelector((state) =>
    todosSlice.selectors.visibleTodosCount(state),
  );

  return <TodoListUi.Title todosCount={todosCount} />;
});

TodoListTitle.displayName = "TodoListTitle";

const TodoList = () => {
  const todos = useAppSelector((state) =>
    todosSlice.selectors.visibleTodos(state),
  );

  return (
    <TodoListUi.Root
      searchSlot={<TodoListSearch />}
      sortSlot={<TodoListSort />}
      titleSlot={<TodoListTitle />}
    >
      {todos.map((todo) => (
        <TodoItem id={todo.id} key={todo.id} />
      ))}
    </TodoListUi.Root>
  );
};

export { TodoList };
