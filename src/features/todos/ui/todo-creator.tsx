import { useDispatch } from "react-redux";
import { todosSlice } from "../model/todos-slice";
import { TodoForm } from "./todo-form";

export const TodoCreator = () => {
  const dispatch = useDispatch();

  const handleSubmit: TodoForm.Props["onSubmit"] = ({ title, description }) => {
    dispatch(
      todosSlice.actions.createTodo({
        title,
        description,
        completed: false,
      }),
    );
  };

  return (
    <TodoForm
      triggerLabel="Создать задачу"
      title="Создать задачу"
      description="Заполните поля и создайте задачу"
      submitLabel="Создать"
      onSubmit={handleSubmit}
    />
  );
};
