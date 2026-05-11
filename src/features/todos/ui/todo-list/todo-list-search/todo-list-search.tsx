import { useId } from "react";
import { useDispatch } from "react-redux";

import { todosSlice } from "~/features/todos/model/todos-slice";
import { useAppSelector } from "~/shared/redux";
import { Field, FieldLabel } from "~/shared/ui/kit/field";
import { Input } from "~/shared/ui/kit/input";

import styles from "./todo-list-search.module.css";

export const TodoListSearch = () => {
  const dispatch = useDispatch();
  const search = useAppSelector(todosSlice.selectors.search);
  const inputId = useId();

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>Поиск задачи: </FieldLabel>
      <Input
        className={styles.searchInput}
        id={inputId}
        onChange={(event) => {
          dispatch(
            todosSlice.actions.updateSearch({
              search: { value: event.currentTarget.value },
            }),
          );
        }}
        placeholder="Введите текст для поиска..."
        type="text"
        value={search.value}
      />
    </Field>
  );
};
