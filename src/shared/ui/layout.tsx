import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";
import styles from "./layout.module.css";
import clsx from "clsx";

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
        <h1 className={styles.homeTitle}>
          <NavLink
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles.active)
            }
            to={homeLink}
          >
            Todo App
          </NavLink>
        </h1>
        <nav>
          <ul className={styles.navLinksList}>
            {navLinks.map(({ to, label }) => (
              <li key={to + label}>
                <NavLink
                  className={({ isActive }) =>
                    clsx(styles.link, isActive && styles.active)
                  }
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>2026</footer>
    </div>
  );
};

export { Layout };
