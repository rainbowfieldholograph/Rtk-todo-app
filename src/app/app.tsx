import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./base.css";
import "./index.css";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
};

export { App };
