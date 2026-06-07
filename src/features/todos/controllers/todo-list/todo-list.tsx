import { useAppSelector } from "~/shared/redux";

import { todosSlice } from "../../model/todos-slice";
import { TodoListUi } from "../../ui/todo-list";
import { TodoItem } from "../todo-item/todo-item";
import { TodoListSearch } from "./todo-list-search";
import { TodoListSort } from "./todo-list-sort";
import { TodoListTitle } from "./todo-list-title";

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
