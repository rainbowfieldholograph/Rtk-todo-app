import { useId } from "react";

import { Field, FieldLabel } from "~/shared/ui/kit/field";
import { Input } from "~/shared/ui/kit/input";

import styles from "./todo-list-search.module.css";

namespace TodoListSearch {
  export type Props = {
    onSearchChange: (search: string) => void;
    search: string;
  };
}

const TodoListSearch = (props: TodoListSearch.Props) => {
  const { onSearchChange, search } = props;
  const inputId = useId();

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>Поиск задачи: </FieldLabel>
      <Input
        className={styles.searchInput}
        id={inputId}
        onChange={(event) => {
          onSearchChange(event.currentTarget.value);
        }}
        placeholder="Введите текст для поиска..."
        type="text"
        value={search}
      />
    </Field>
  );
};

export { TodoListSearch };
