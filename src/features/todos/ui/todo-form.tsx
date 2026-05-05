import { useId, useState, type ComponentProps } from "react";
import { Button } from "~/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/shared/ui/kit/dialog";
import { FieldSet, FieldGroup, Field, FieldLabel } from "~/shared/ui/kit/field";
import { Input } from "~/shared/ui/kit/input";
import type { Todo } from "../model/todos-slice";
import { Textarea } from "~/shared/ui/kit/textarea";
import styles from "./todo-form.module.css";

type TodoFields = Pick<Todo, "description" | "title" | "completed">;
type RenderTrigger = ComponentProps<typeof DialogTrigger>["render"];
type TriggerProps =
  | { triggerLabel: string; renderTrigger?: never }
  | { triggerLabel?: never; renderTrigger: RenderTrigger };

namespace TodoForm {
  export type Props = {
    title: string;
    description: string;
    submitLabel: string;
    onSubmit: (todo: TodoFields) => void | Promise<void>;
    initialValues?: TodoFields;
  } & TriggerProps;
}

const TodoForm = (props: TodoForm.Props) => {
  const {
    description,
    title,
    onSubmit,
    submitLabel,
    triggerLabel,
    initialValues = {
      title: "",
      description: "",
      completed: false,
    },
    renderTrigger,
  } = props;

  const [open, setOpen] = useState(false);
  const [todoFields, setTodoFields] = useState(initialValues);

  const titleInputId = useId();
  const descriptionInputId = useId();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    onSubmit(todoFields);

    setOpen(false);
    setTodoFields(initialValues);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger
        render={renderTrigger ?? <Button>{triggerLabel}</Button>}
      />
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup className={styles.fields}>
              <Field>
                <FieldLabel htmlFor={titleInputId}>Название задачи</FieldLabel>
                <Input
                  id={titleInputId}
                  value={todoFields.title}
                  onChange={(event) => {
                    setTodoFields((prevState) => ({
                      ...prevState,
                      title: event.target.value,
                    }));
                  }}
                  placeholder="Введите название задачи"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={descriptionInputId}>Описание</FieldLabel>
                <Textarea
                  className={styles.textarea}
                  id={descriptionInputId}
                  value={todoFields.description}
                  onChange={(event) => {
                    setTodoFields((prevState) => ({
                      ...prevState,
                      description: event.target.value,
                    }));
                  }}
                  placeholder="Введите описание задачи"
                />
              </Field>
            </FieldGroup>
            <Button type="submit">{submitLabel}</Button>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { TodoForm };
