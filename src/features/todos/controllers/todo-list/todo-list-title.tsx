import { memo } from "react";

import { useAppSelector } from "~/shared/redux";

import { todosSlice } from "../../model/todos-slice";
import { TodoListUi } from "../../ui/todo-list";

const TodoListTitle = memo(() => {
  const todosCount = useAppSelector((state) =>
    todosSlice.selectors.visibleTodosCount(state),
  );

  return <TodoListUi.Title todosCount={todosCount} />;
});

TodoListTitle.displayName = "TodoListTitle";

export { TodoListTitle };
