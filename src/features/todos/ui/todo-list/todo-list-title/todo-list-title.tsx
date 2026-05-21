import styles from "./todo-list-title.module.css";

namespace TodoListTitle {
  export type Props = { todosCount: number };
}

const TodoListTitle = (props: TodoListTitle.Props) => {
  const { todosCount } = props;

  return <h2 className={styles.title}>Список задач ({todosCount}): </h2>;
};

export { TodoListTitle };
