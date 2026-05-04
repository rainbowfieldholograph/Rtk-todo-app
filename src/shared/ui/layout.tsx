import type { PropsWithChildren } from "react";
import styles from "./layout.module.css";

namespace Layout {
  export type Props = PropsWithChildren<{}>;
}

const Layout = (props: Layout.Props) => {
  const { children } = props;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Todo app</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export { Layout };
