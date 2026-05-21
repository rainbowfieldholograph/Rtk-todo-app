import { useId } from "react";

import { Checkbox } from "~/shared/ui/kit/checkbox";
import { Field, FieldLabel } from "~/shared/ui/kit/field";

import styles from "./todo-item-completed-checkbox.module.css";

namespace TodoItemCompletedCheckbox {
  export type Props = {
    completed: Checkbox.Props["checked"];
    onCompletedChange: Checkbox.Props["onCheckedChange"];
  };
}

const TodoItemCompletedCheckbox = (props: TodoItemCompletedCheckbox.Props) => {
  const { completed, onCompletedChange } = props;
  const checkboxId = useId();

  return (
    <Field className={styles.field} orientation="horizontal">
      <FieldLabel htmlFor={checkboxId}>Задача выполнена:</FieldLabel>
      <Checkbox
        checked={completed}
        id={checkboxId}
        onCheckedChange={onCompletedChange}
      />
    </Field>
  );
};

export { TodoItemCompletedCheckbox };
