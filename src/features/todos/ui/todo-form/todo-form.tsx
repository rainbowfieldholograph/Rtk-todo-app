import { type ComponentProps, useId, useState } from "react";

import { Button } from "~/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/shared/ui/kit/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "~/shared/ui/kit/field";
import { Input } from "~/shared/ui/kit/input";
import { Textarea } from "~/shared/ui/kit/textarea";

import type { Todo } from "../../model/todos-slice";

import styles from "./todo-form.module.css";

type RenderTrigger = ComponentProps<typeof DialogTrigger>["render"];
type TodoFields = Pick<Todo, "completed" | "description" | "title">;
type TriggerProps =
  | { renderTrigger: RenderTrigger; triggerLabel?: never }
  | { renderTrigger?: never; triggerLabel: string };

namespace TodoForm {
  export type Props = TriggerProps & {
    description: string;
    initialValues?: TodoFields;
    onSubmit: (todo: TodoFields) => Promise<void> | void;
    submitLabel: string;
    title: string;
  };
}

const TodoForm = (props: TodoForm.Props) => {
  const {
    description,
    initialValues = {
      completed: false,
      description: "",
      title: "",
    },
    onSubmit,
    renderTrigger,
    submitLabel,
    title,
    triggerLabel,
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
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
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
                  onChange={(event) => {
                    setTodoFields((prevState) => ({
                      ...prevState,
                      title: event.target.value,
                    }));
                  }}
                  placeholder="Введите название задачи"
                  value={todoFields.title}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={descriptionInputId}>Описание</FieldLabel>
                <Textarea
                  className={styles.textarea}
                  id={descriptionInputId}
                  onChange={(event) => {
                    setTodoFields((prevState) => ({
                      ...prevState,
                      description: event.target.value,
                    }));
                  }}
                  placeholder="Введите описание задачи"
                  value={todoFields.description}
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
