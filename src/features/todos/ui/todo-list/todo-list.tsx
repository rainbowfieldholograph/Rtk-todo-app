import { useAppSelector } from "~/shared/redux";

import { todosSlice } from "../../model/todos-slice";
import { TodoItem } from "../todo-item/todo-item";
import { TodoListSearch } from "./todo-list-search/todo-list-search";
import { TodoListSort } from "./todo-list-sort/todo-list-sort";
import styles from "./todo-list.module.css";

const TodoListTitle = () => {
  const todosCount = useAppSelector((state) =>
    todosSlice.selectors.visibleTodosCount(state),
  );

  return <h2 className={styles.title}>Список задач ({todosCount}): </h2>;
};

const TodoList = () => {
  const todos = useAppSelector((state) =>
    todosSlice.selectors.visibleTodos(state),
  );

  return (
    <section>
      <TodoListTitle />
      <div className={styles.sort}>
        <TodoListSort />
      </div>
      <div className={styles.search}>
        <TodoListSearch />
      </div>
      <ul className={styles.list}>
        {todos.map(({ id }) => (
          <li className={styles.listItem} key={id}>
            <TodoItem id={id} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TodoList };
