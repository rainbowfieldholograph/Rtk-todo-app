import { Children, type PropsWithChildren, type ReactNode } from "react";

import styles from "./todo-list-root.module.css";

namespace TodoListRoot {
  export type Props = PropsWithChildren<{
    searchSlot: ReactNode;
    sortSlot: ReactNode;
    titleSlot: ReactNode;
  }>;
}

const TodoListRoot = (props: TodoListRoot.Props) => {
  const { children, searchSlot, sortSlot, titleSlot } = props;

  return (
    <section>
      <div className={styles.title}>{titleSlot}</div>
      <div className={styles.sort}>{sortSlot}</div>
      <div className={styles.search}>{searchSlot}</div>
      <ul className={styles.list}>
        {Children.map(children, (child) => (
          <li className={styles.listItem}>{child}</li>
        ))}
      </ul>
    </section>
  );
};

export { TodoListRoot };
