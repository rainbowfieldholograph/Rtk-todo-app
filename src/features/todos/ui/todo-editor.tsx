import { useDispatch } from "react-redux";
import { TodoForm } from "./todo-form";
import { todosSlice, type Todo } from "../model/todos-slice";

namespace TodoEditor {
  export type Props = { todo: Todo };
}

const TodoEditor = (props: TodoEditor.Props) => {
  const { todo } = props;
  const { id, title, description, completed } = todo;

  const dispatch = useDispatch();

  const handleSubmit: TodoForm.Props["onSubmit"] = async (fields) => {
    dispatch(todosSlice.actions.editTodo({ id, fields }));
  };

  return (
    <TodoForm
      triggerLabel="Редактировать"
      title="Редактировать задачу"
      description="Измените поля задачи"
      submitLabel="Редактировать"
      onSubmit={handleSubmit}
      initialValues={{ completed, title, description }}
    />
  );
};

export { TodoEditor };
