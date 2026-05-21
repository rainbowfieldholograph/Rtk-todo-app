import { TodoList } from "../controllers/todo-list";
import { TodoCreator } from "../ui/todo-creator";
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
