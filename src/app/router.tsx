import { createBrowserRouter, Outlet } from "react-router";

import { TodoListPage } from "~/features/todos";
import { WelcomePage } from "~/pages/welcome-page";
import { Layout } from "~/shared/ui/layout";

const router = createBrowserRouter([
  {
    children: [
      { Component: WelcomePage, path: "/" },
      { Component: TodoListPage, path: "/todos" },
    ],
    element: (
      <Layout homeLink="/" navLinks={[{ label: "Задачи", to: "/todos" }]}>
        <Outlet />
      </Layout>
    ),
  },
]);

export { router };
