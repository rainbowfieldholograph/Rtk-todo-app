import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { rootReducer } from "../../../shared/redux";
import todos from "../config/mock-todos.json" with { type: "json" };

type TodoId = string;
type Todo = {
  id: TodoId;
  title: string;
  description: string;
  completed: boolean;
  /** ISO 8601 с миллисекундами (2026-05-07T10:30:00.000Z) */
  createdAt: string;
  /** ISO 8601 с миллисекундами (2026-05-07T10:30:00.000Z) */
  updatedAt: string;
};
type TodosEntityState = {
  entities: Record<TodoId, Todo>;
  ids: TodoId[]; // Управляет порядком списка
};

type SortField = keyof Pick<Todo, "completed" | "description" | "title">;
type SortOrder = "asc" | "desc"; // Возрастание, убывание
type Sort = { field: SortField | null; order: SortOrder };

type State = {
  selectedSort: Sort;
  items: TodosEntityState;
};

const initialSort: Sort = {
  field: null,
  order: "asc",
};

const initialTodos: TodosEntityState = todos.reduce(
  (acc, cur) => {
    acc.entities[cur.id] = cur;
    acc.ids.push(cur.id);
    return acc;
  },
  { entities: {}, ids: [] } as TodosEntityState,
);

const initialState = {
  items: initialTodos,
  selectedSort: initialSort,
} satisfies State;

const selectTodoList = createSelector(
  [(state: State) => state.items.entities, (state: State) => state.items.ids],
  (entities, ids) => {
    return ids.map((id) => {
      const todo = entities[id];
      if (!todo) {
        throw new Error(`Todo with id ${id} not found in entities`);
      }
      return todo;
    });
  },
);

const todosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: (create) => {
    const createTodo = create.reducer(
      (
        state,
        action: PayloadAction<
          Pick<Todo, "title" | "completed" | "description">
        >,
      ) => {
        const id = crypto.randomUUID();
        const dateNowISO = new Date().toISOString();

        const createdTodo: Todo = {
          id,
          ...action.payload,
          createdAt: dateNowISO,
          updatedAt: dateNowISO,
        };

        state.items.entities[id] = createdTodo;
        state.items.ids.push(id);
      },
    );

    const removeTodo = create.reducer(
      (state, action: PayloadAction<{ id: TodoId }>) => {
        const { id } = action.payload;

        delete state.items.entities[id];

        const todoIndex = state.items.ids.findIndex((todoId) => todoId === id);
        if (todoIndex === -1) return;

        state.items.ids.splice(todoIndex, 1);
      },
    );

    const editTodo = create.reducer(
      (
        state,
        action: PayloadAction<{
          id: TodoId;
          fields: Partial<Pick<Todo, "title" | "description" | "completed">>;
        }>,
      ) => {
        const { fields, id } = action.payload;

        const todo = state.items.entities[id];
        if (!todo) return;

        state.items.entities[id] = {
          ...todo,
          ...fields,
          updatedAt: new Date().toISOString(),
        };
      },
    );

    const toggleTodoCompleted = create.reducer(
      (state, action: PayloadAction<{ id: TodoId; completed?: boolean }>) => {
        const { id, completed } = action.payload;

        const todo = state.items.entities[id];
        if (!todo) return;

        todo.completed = completed ?? !todo.completed;
      },
    );

    const changeSort = create.reducer(
      (state, action: PayloadAction<{ sort: Partial<Sort> }>) => {
        const { sort } = action.payload;

        if (sort.field) state.selectedSort.field = sort.field;
        if (sort.order) state.selectedSort.order = sort.order;
      },
    );

    return {
      createTodo,
      removeTodo,
      editTodo,
      toggleTodoCompleted,
      changeSort,
    };
  },
  selectors: {
    todoEntities: (state: State) => state.items.entities,
    todoIds: (state: State) => state.items.ids,
    todoList: selectTodoList,
    todoCompleted: (state: State, id: TodoId) =>
      state.items.entities[id]?.completed,
    selectedSort: (state: State) => state.selectedSort,
    sortedTodoList: createSelector(
      [selectTodoList, (state: State) => state.selectedSort],
      (todos, sort) => {
        const { field, order } = sort;
        if (!field) return todos;

        const todoList = todos.toSorted((a, b) => {
          const aValue = a[field];
          const bValue = b[field];

          if (typeof aValue === "string" && typeof bValue === "string") {
            return order === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }

          if (typeof aValue === "boolean" && typeof bValue === "boolean") {
            return order === "asc" ? +aValue - +bValue : +bValue - +aValue;
          }

          return 0;
        });

        return todoList;
      },
    ),
  },
}).injectInto(rootReducer);

export { todosSlice };
export type { Todo, TodoId, SortField, Sort, SortOrder };
