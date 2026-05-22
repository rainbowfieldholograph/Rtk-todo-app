import { useDispatch } from "react-redux";

import { todosSlice } from "../model/todos-slice";
import { TodoForm } from "../ui/todo-form/todo-form";

const TodoCreator = () => {
  const dispatch = useDispatch();

  const handleSubmit: TodoForm.Props["onSubmit"] = ({ description, title }) => {
    dispatch(
      todosSlice.actions.createTodo({
        completed: false,
        description,
        title,
      }),
    );
  };

  return (
    <TodoForm
      description="Заполните поля и создайте задачу"
      onSubmit={handleSubmit}
      submitLabel="Создать"
      title="Создать задачу"
      triggerLabel="Создать задачу"
    />
  );
};

export { TodoCreator };
