import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "~/shared/ui/kit/select";
import { useAppSelector } from "../../../shared/redux";
import { todosSlice, type SortField } from "../model/todos-slice";
import { TodoItem } from "./todo-item/todo-item";
import { Field, FieldLabel } from "~/shared/ui/kit/field";
import { useId } from "react";
import { useDispatch } from "react-redux";
import styles from "./todo-list.module.css";

const selectItems = [
  { label: "По названию", value: "title" },
  { label: "По статусу выполнения", value: "completed" },
  { label: "По описанию", value: "description" },
] satisfies {
  label: string;
  value: SortField;
}[];

const TodoList = () => {
  const selectId = useId();
  const dispatch = useDispatch();
  const todos = useAppSelector((state) => todosSlice.selectors.todoList(state));
  const selectedSort = useAppSelector((state) =>
    todosSlice.selectors.selectedSort(state),
  );

  return (
    <section>
      <h2 className={styles.title}>Список задач: </h2>
      <div className={styles.selectContainer}>
        <Field>
          <FieldLabel htmlFor={selectId}>Сортировка:</FieldLabel>
          <Select
            value={selectedSort}
            onValueChange={(sort) => {
              dispatch(todosSlice.actions.changeSort({ sort }));
            }}
            id={selectId}
            items={selectItems}
          >
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue
                className={styles.selectValue}
                placeholder="Выберите тип"
              />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {selectItems.map(({ label, value }) => (
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
        {todos.map((todo) => (
          <li className={styles.listItem} key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TodoList };
