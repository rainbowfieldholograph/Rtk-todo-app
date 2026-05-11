import { useId } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "~/shared/redux";
import { Checkbox } from "~/shared/ui/kit/checkbox";
import { Field, FieldLabel } from "~/shared/ui/kit/field";

import { type TodoId, todosSlice } from "../../model/todos-slice";
import styles from "./todo-completed-checkbox.module.css";

namespace TodoCompletedCheckbox {
  export type Props = { id: TodoId };
}

const TodoCompletedCheckbox = (props: TodoCompletedCheckbox.Props) => {
  const { id } = props;

  const checkboxId = useId();
  const completed = useAppSelector((state) =>
    todosSlice.selectors.todoCompleted(state, id),
  );
  const dispatch = useDispatch();

  if (completed === undefined) return null;

  const handleToggleCompleted = () => {
    dispatch(todosSlice.actions.toggleTodoCompleted({ id }));
  };

  return (
    <Field className={styles.field} orientation="horizontal">
      <FieldLabel htmlFor={checkboxId}>Задача выполнена:</FieldLabel>
      <Checkbox
        checked={completed}
        id={checkboxId}
        onCheckedChange={handleToggleCompleted}
      />
    </Field>
  );
};

export { TodoCompletedCheckbox };
