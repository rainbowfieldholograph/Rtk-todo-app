import { TodoCreator } from "../controllers/todo-creator";
import { TodoList } from "../controllers/todo-list/todo-list";
import styles from "./todo-list-page.module.css";

const TodoListPage = () => {
  return (
    <div>
      <div className={styles.creator}>
        <TodoCreator />
      </div>
      <TodoList />
    </div>
  );
};

export { TodoListPage };
