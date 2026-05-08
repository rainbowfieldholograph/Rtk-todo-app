import { useAppSelector } from "~/shared/redux";
import { todosSlice } from "../../model/todos-slice";
import { TodoItem } from "../todo-item/todo-item";
import { TodoListSort } from "./todo-list-sort/todo-list-sort";
import styles from "./todo-list.module.css";

const TodoList = () => {
  const todos = useAppSelector((state) =>
    todosSlice.selectors.sortedTodoList(state),
  );

  return (
    <section>
      <h2 className={styles.title}>Список задач: </h2>
      <div className={styles.sort}>
        <TodoListSort />
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
