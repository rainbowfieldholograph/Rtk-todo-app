import { useId, useState, type ComponentProps } from "react";
import { useDispatch } from "react-redux";
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
import { todosSlice } from "../model/todos-slice";
import styles from "./todo-creator.module.css";

export const TodoCreator = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleInputId = useId();
  const descriptionInputId = useId();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    dispatch(
      todosSlice.actions.createTodo({
        title,
        description,
        completed: false,
      }),
    );
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger render={<Button>Создать задачу</Button>} />
      <DialogContent>
        <DialogTitle>Создать задачу</DialogTitle>
        <DialogDescription>Создание задачи</DialogDescription>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup className={styles.fields}>
              <Field>
                <FieldLabel htmlFor={titleInputId}>Название</FieldLabel>
                <Input
                  id={titleInputId}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.currentTarget.value);
                  }}
                  placeholder="Введите название задачи"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={descriptionInputId}>Описание</FieldLabel>
                <Input
                  id={descriptionInputId}
                  value={description}
                  onChange={(event) => {
                    setDescription(event.currentTarget.value);
                  }}
                  placeholder="Введите описание задачи"
                />
              </Field>
            </FieldGroup>
            <Button type="submit">Создать</Button>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
};
