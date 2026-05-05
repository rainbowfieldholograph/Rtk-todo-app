import type { PropsWithChildren } from "react";
import { Link } from "react-router";
import styles from "./layout.module.css";

namespace Layout {
  export type NavLink = { to: string; label: string };
  export type Props = PropsWithChildren<{
    homeLink: string;
    navLinks: NavLink[];
  }>;
}

const Layout = (props: Layout.Props) => {
  const { children, homeLink, navLinks } = props;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link to={homeLink}>Todo App</Link>
        </h1>
        <nav>
          <ul className={styles.navLinksList}>
            {navLinks.map(({ to, label }) => (
              <li key={to + label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export { Layout };
