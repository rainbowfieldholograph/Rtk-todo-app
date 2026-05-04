import { useAppSelector } from "../../../shared/redux";
import { todosSlice } from "../model/todos-slice";
import { TodoItem } from "./todo-item";
import styles from "./todo-list.module.css";

const TodoList = () => {
  const todos = useAppSelector((state) => todosSlice.selectors.todoList(state));

  return (
    <section>
      <h2 className={styles.title}>Список задач: </h2>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li className={styles.listItem} key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TodoList };
