import { memo, useId, useMemo } from "react";
import { useDispatch } from "react-redux";

import { type Sort, todosSlice } from "~/features/todos/model/todos-slice";
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

const sortSelectItems = [
  { label: "По названию (A-Z)", sort: { field: "title", order: "asc" } },
  { label: "По названию (Z-A)", sort: { field: "title", order: "desc" } },
  {
    label: "Сначала выполненные",
    sort: {
      field: "completed",
      order: "desc",
    },
  },
  {
    label: "Сначала не выполненные",
    sort: {
      field: "completed",
      order: "asc",
    },
  },
  { label: "По описанию (A-Z)", sort: { field: "description", order: "asc" } },
  {
    label: "По описанию (Z-A)",
    sort: { field: "description", order: "desc" },
  },
  {
    label: "Сначала новые (по дате создания)",
    sort: { field: "createdAt", order: "asc" },
  },
  {
    label: "Сначала старые (по дате создания)",
    sort: { field: "createdAt", order: "desc" },
  },
  {
    label: "Сначала новые (по дате обновления)",
    sort: { field: "updatedAt", order: "asc" },
  },
  {
    label: "Сначала старые (по дате обновления)",
    sort: { field: "updatedAt", order: "desc" },
  },
] satisfies SortSelectItem[];

type SortSelectItem = { label: string; sort: Sort };

namespace TodoListTypeSort {
  export type Props = { selectId: string };
}

const TodoListTypeSort = (props: TodoListTypeSort.Props) => {
  const { selectId } = props;

  const selectedSort = useAppSelector((state) =>
    todosSlice.selectors.selectedSort(state),
  );
  const selectedSelectOption = useMemo(() => {
    return sortSelectItems.find(
      ({ sort }) =>
        sort.field === selectedSort.field && sort.order === selectedSort.order,
    );
  }, [selectedSort.field, selectedSort.order]);
  const dispatch = useDispatch();

  return (
    <Select
      id={selectId}
      onValueChange={(sort) => {
        if (!sort) return;
        dispatch(todosSlice.actions.changeSort({ sort }));
      }}
      value={selectedSort}
    >
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue className={styles.selectValue} placeholder="Выберите тип">
          {() => selectedSelectOption?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className={styles.selectContent}>
        <SelectGroup>
          {sortSelectItems.map(({ label, sort }) => (
            <SelectItem key={sort.field + sort.order} value={sort}>
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
    </Field>
  );
});

TodoListSort.displayName = "TodoListSort";

export { TodoListSort };
