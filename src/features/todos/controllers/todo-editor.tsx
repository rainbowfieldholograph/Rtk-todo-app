import { useDispatch } from "react-redux";

import { type Todo, todosSlice } from "../model/todos-slice";
import { TodoForm } from "../ui/todo-form/todo-form";

namespace TodoEditor {
  export type Props = { todo: Todo };
}

const TodoEditor = (props: TodoEditor.Props) => {
  const { todo } = props;
  const { completed, description, id, title } = todo;

  const dispatch = useDispatch();

  const handleSubmit: TodoForm.Props["onSubmit"] = async (fields) => {
    dispatch(todosSlice.actions.editTodo({ fields, id }));
  };

  return (
    <TodoForm
      description="Измените поля задачи"
      initialValues={{ completed, description, title }}
      onSubmit={handleSubmit}
      submitLabel="Редактировать"
      title="Редактировать задачу"
      triggerLabel="Редактировать"
    />
  );
};

export { TodoEditor };
