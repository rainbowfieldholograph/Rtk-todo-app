import { memo, useId } from "react";
import { useDispatch } from "react-redux";
import {
  todosSlice,
  type SortField,
  type SortOrder,
} from "~/features/todos/model/todos-slice";
import { useAppSelector } from "~/shared/redux";
import { Field, FieldLabel } from "~/shared/ui/kit/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/kit/select";
import styles from "./todo-list-sort.module.css";

const sortOrderSelectItems = [
  { label: "По возрастанию", value: "asc" },
  { label: "По убыванию", value: "desc" },
] satisfies { label: string; value: SortOrder }[];

const sortFieldSelectItems = [
  { label: "По названию", value: "title" },
  { label: "По статусу выполнения", value: "completed" },
  { label: "По описанию", value: "description" },
] satisfies { label: string; value: SortField }[];

namespace TodoListTypeSort {
  export type Props = { selectId: string };
}

const TodoListTypeSort = (props: TodoListTypeSort.Props) => {
  const { selectId } = props;

  const selectedSort = useAppSelector((state) =>
    todosSlice.selectors.selectedSort(state),
  );
  const dispatch = useDispatch();

  return (
    <Select
      value={selectedSort.field}
      onValueChange={(field) => {
        dispatch(todosSlice.actions.changeSort({ sort: { field } }));
      }}
      id={selectId}
      items={sortFieldSelectItems}
    >
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue
          className={styles.selectValue}
          placeholder="Выберите тип"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortFieldSelectItems.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const TodoListOrderSort = () => {
  const selectedSort = useAppSelector((state) =>
    todosSlice.selectors.selectedSort(state),
  );
  const dispatch = useDispatch();

  return (
    <Select
      disabled={!selectedSort.field}
      value={selectedSort.order}
      onValueChange={(order) => {
        if (!order) return;
        dispatch(todosSlice.actions.changeSort({ sort: { order } }));
      }}
      items={sortOrderSelectItems}
    >
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue
          className={styles.selectValue}
          placeholder="Выберите порядок"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOrderSelectItems.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const TodoListSort = memo(() => {
  const selectId = useId();

  return (
    <Field>
      <FieldLabel htmlFor={selectId}>Сортировка:</FieldLabel>
      <TodoListTypeSort selectId={selectId} />
      <TodoListOrderSort />
    </Field>
  );
});

export { TodoListSort };
