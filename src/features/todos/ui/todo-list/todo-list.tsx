import { useAppSelector } from "~/shared/redux";
import { todosSlice } from "../../model/todos-slice";
import { TodoItem } from "../todo-item/todo-item";
import { TodoListSort } from "./todo-list-sort/todo-list-sort";
import styles from "./todo-list.module.css";

const TodoList = () => {
  const sortedTodos = useAppSelector((state) =>
    todosSlice.selectors.sortedTodoList(state),
  );

  return (
    <section>
      <h2 className={styles.title}>Список задач: </h2>
      <div className={styles.sort}>
        <TodoListSort />
      </div>
      <ul className={styles.list}>
        {sortedTodos.map((todo) => (
          <li className={styles.listItem} key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TodoList };
