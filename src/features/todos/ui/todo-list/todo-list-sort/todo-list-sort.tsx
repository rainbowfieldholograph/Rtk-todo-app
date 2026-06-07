import { useId, useMemo } from "react";

import { Field, FieldLabel } from "~/shared/ui/kit/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/kit/select";

import { type Sort } from "../../../model/todos-slice";
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

namespace TodoListSort {
  export type Props = {
    onSelectedSortChange: (sort: Sort) => void;
    selectedSort: Sort;
  };
}

const TodoListSort = (props: TodoListSort.Props) => {
  const { onSelectedSortChange, selectedSort } = props;
  const selectId = useId();

  const selectedSelectOption = useMemo(() => {
    return sortSelectItems.find(
      ({ sort }) =>
        sort.field === selectedSort.field && sort.order === selectedSort.order,
    );
  }, [selectedSort.field, selectedSort.order]);

  return (
    <Field>
      <FieldLabel className={styles.label} htmlFor={selectId}>
        Сортировка:
      </FieldLabel>
      <Select
        id={selectId}
        onValueChange={(sort) => {
          if (!sort) return;
          onSelectedSortChange(sort);
        }}
        value={selectedSort}
      >
        <SelectTrigger className={styles.selectTrigger}>
          <SelectValue
            className={styles.selectValue}
            placeholder="Выберите тип"
          >
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
    </Field>
  );
};

export { sortSelectItems, TodoListSort };
