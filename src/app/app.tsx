import { Provider as ReduxProvider } from "react-redux";
import { Layout } from "../shared/ui/layout";
import { TodoListPage } from "../features/todos";
import { store } from "./store";
import "./base.css";
import "./index.css";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Layout>
        <TodoListPage />
      </Layout>
    </ReduxProvider>
  );
};

export { App };
