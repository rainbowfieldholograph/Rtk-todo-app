import { memo, useId } from "react";
import { useDispatch } from "react-redux";

import { todosSlice } from "~/features/todos/model/todos-slice";
import { useAppSelector } from "~/shared/redux";
import { Field, FieldLabel } from "~/shared/ui/kit/field";
import { Input } from "~/shared/ui/kit/input";

import styles from "./todo-list-search.module.css";

namespace TodoListSearchInput {
  export type Props = { inputId: string };
}

const TodoListSearchInput = (props: TodoListSearchInput.Props) => {
  const { inputId } = props;

  const dispatch = useDispatch();
  const search = useAppSelector(todosSlice.selectors.search);

  return (
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
  );
};

const TodoListSearch = memo(() => {
  const inputId = useId();

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>Поиск задачи: </FieldLabel>
      <TodoListSearchInput inputId={inputId} />
    </Field>
  );
});

TodoListSearch.displayName = "TodoListSearch";

export { TodoListSearch };
