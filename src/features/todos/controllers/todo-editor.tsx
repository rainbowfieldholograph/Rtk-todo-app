import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";

import { type TodoId, todosSlice } from "../model/todos-slice";
import { TodoForm } from "../ui/todo-form/todo-form";

namespace TodoEditor {
  export type Props = { id: TodoId };
}

const TodoEditor = (props: TodoEditor.Props) => {
  const { id } = props;

  const todo = useAppSelector((state) =>
    todosSlice.selectors.todoById(state, id),
  );
  const dispatch = useDispatch();

  if (!todo) {
    throw new Error(
      `TodoEditor component error. Todo with id ${id} was not found.`,
    );
  }

  const { completed, description, title } = todo;

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
