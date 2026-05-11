import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { rootReducer } from "../../../shared/redux";
import todos from "../config/mock-todos.json" with { type: "json" };

type Sort = { field: SortField; order: SortOrder };
type SortField = keyof Pick<
  Todo,
  "completed" | "createdAt" | "description" | "title" | "updatedAt"
>;
/** asc: возрастание, desc: убывание */
type SortOrder = "asc" | "desc";

type State = {
  items: TodosEntityState;
  selectedSort: Sort;
};
type Todo = {
  completed: boolean;
  /** ISO 8601 с миллисекундами (2026-05-07T10:30:00.000Z) */
  createdAt: string;
  description: string;
  id: TodoId;
  title: string;
  /** ISO 8601 с миллисекундами (2026-05-07T10:30:00.000Z) */
  updatedAt: string;
};
type TodoId = string;

type TodosEntityState = {
  entities: Record<TodoId, Todo>;
  ids: TodoId[]; // Управляет порядком списка
};

const sortTodos = (todos: Todo[], sort: Sort) => {
  const sortedTodos = todos.toSorted((a, b) => {
    const { field, order } = sort;
    const aValue = a[field];
    const bValue = b[field];

    if (field === "createdAt" || field === "updatedAt") {
      const aDate = new Date(a[field]).getTime();
      const bDate = new Date(b[field]).getTime();

      return order === "asc" ? aDate - bDate : bDate - aDate;
    }

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

  return sortedTodos;
};

const initialSort: Sort = { field: "createdAt", order: "asc" };

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
  initialState,
  name: "Todos",
  reducers: (create) => {
    const createTodo = create.reducer(
      (
        state,
        action: PayloadAction<
          Pick<Todo, "completed" | "description" | "title">
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
          fields: Partial<Pick<Todo, "completed" | "description" | "title">>;
          id: TodoId;
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
      (state, action: PayloadAction<{ completed?: boolean; id: TodoId; }>) => {
        const { completed, id } = action.payload;

        const todo = state.items.entities[id];
        if (!todo) return;

        todo.completed = completed ?? !todo.completed;
      },
    );

    const changeSort = create.reducer(
      (state, action: PayloadAction<{ sort: Partial<Sort> }>) => {
        state.selectedSort = { ...state.selectedSort, ...action.payload.sort };
      },
    );

    return {
      changeSort,
      createTodo,
      editTodo,
      removeTodo,
      toggleTodoCompleted,
    };
  },
  selectors: {
    selectedSort: (state: State) => state.selectedSort,
    sortedTodoList: createSelector(
      [selectTodoList, (state: State) => state.selectedSort],
      (todos, sort) => (sort.field ? sortTodos(todos, sort) : todos),
    ),
    todoById: (state: State, id: TodoId) => state.items.entities[id],
    todoCompleted: (state: State, id: TodoId) =>
      state.items.entities[id]?.completed,
    todoEntities: (state: State) => state.items.entities,
    todoIds: (state: State) => state.items.ids,
    todoList: selectTodoList,
  },
}).injectInto(rootReducer);

export { todosSlice };
export type { Sort, SortField, SortOrder, Todo, TodoId };
