import { createBrowserRouter, Outlet } from "react-router";
import { TodoListPage } from "~/features/todos";
import { WelcomePage } from "~/pages/welcome-page";
import { Layout } from "~/shared/ui/layout";

const router = createBrowserRouter([
  {
    element: (
      <Layout homeLink="/" navLinks={[{ to: "/todos", label: "Задачи" }]}>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "/", Component: WelcomePage },
      { path: "/todos", Component: TodoListPage },
    ],
  },
]);

export { router };
