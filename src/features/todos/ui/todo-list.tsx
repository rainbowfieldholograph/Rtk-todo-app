import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "~/shared/ui/kit/select";
import { useAppSelector } from "../../../shared/redux";
import {
  todosSlice,
  type SortField,
  type SortOrder,
} from "../model/todos-slice";
import { TodoItem } from "./todo-item/todo-item";
import { Field, FieldLabel } from "~/shared/ui/kit/field";
import { useId } from "react";
import { useDispatch } from "react-redux";
import styles from "./todo-list.module.css";

const sortOrderSelectItems = [
  { label: "По возрастанию", value: "asc" },
  { label: "По убыванию", value: "desc" },
] satisfies { label: string; value: SortOrder }[];

const sortFieldSelectItems = [
  { label: "По названию", value: "title" },
  { label: "По статусу выполнения", value: "completed" },
  { label: "По описанию", value: "description" },
] satisfies { label: string; value: SortField }[];

const TodoList = () => {
  const selectId = useId();
  const dispatch = useDispatch();

  const selectedSort = useAppSelector((state) =>
    todosSlice.selectors.selectedSort(state),
  );
  const sortedTodos = useAppSelector((state) =>
    todosSlice.selectors.sortedTodoList(state),
  );

  return (
    <section>
      <h2 className={styles.title}>Список задач: </h2>
      <div className={styles.selectContainer}>
        <Field>
          <FieldLabel htmlFor={selectId}>Сортировка:</FieldLabel>
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
          <Select
            disabled={!selectedSort.field}
            value={selectedSort.order}
            onValueChange={(order) => {
              if (!order) return;
              dispatch(todosSlice.actions.changeSort({ sort: { order } }));
            }}
            id={selectId}
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
        </Field>
      </div>
      <ul className={styles.list}>
        {sortedTodos.map((todo) => (
          <li className={styles.listItem} key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TodoList };
