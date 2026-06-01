import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import Fuse from "fuse.js";

import { rootReducer } from "../../../shared/redux";
import todos from "../config/mock-todos.json" with { type: "json" };

type Search = { field: SearchField; value: string };
type SearchField = keyof Pick<Todo, "description" | "title">;

type Sort = { field: SortField; order: SortOrder };
type SortField = keyof Pick<
  Todo,
  "completed" | "createdAt" | "description" | "title" | "updatedAt"
>;
/** asc: возрастание (если даты, то от старых к новым), desc: убывание (если даты, то от новых к старым) */
type SortOrder = "asc" | "desc";

type State = {
  items: TodosEntityState;
  search: Search;
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

const initialSort: Sort = { field: "updatedAt", order: "desc" };
const initialSearch: Search = { field: "title", value: "" };
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
  search: initialSearch,
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

const selectSortedTodoList = createSelector(
  [selectTodoList, (state: State) => state.selectedSort],
  (todos, sort) => (sort.field ? sortTodos(todos, sort) : todos),
);

const selectTodoFuse = createSelector(
  [selectSortedTodoList, (state: State) => state.search.field],
  (todos, field) => {
    return new Fuse(todos, {
      ignoreLocation: true,
      keys: [field],
      threshold: 0.3,
    });
  },
);

const selectVisibleTodos = createSelector(
  [selectTodoFuse, (state: State) => state.search],
  (todoFuse, search) => {
    if (!search.value) return todoFuse.getIndex().docs;
    return todoFuse.search(search.value).map(({ item }) => item);
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
      (state, action: PayloadAction<{ completed?: boolean; id: TodoId }>) => {
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

    const updateSearch = create.reducer(
      (state, action: PayloadAction<{ search: Partial<Search> }>) => {
        const { search } = action.payload;

        if (search.value !== undefined) state.search.value = search.value;
        if (search.field !== undefined) state.search.field = search.field;
      },
    );

    return {
      changeSort,
      createTodo,
      editTodo,
      removeTodo,
      toggleTodoCompleted,
      updateSearch,
    };
  },
  selectors: {
    search: (state: State) => state.search,
    selectedSort: (state: State) => state.selectedSort,
    sortedTodoList: selectSortedTodoList,
    todoById: (state: State, id: TodoId) => state.items.entities[id],
    todoCompleted: (state: State, id: TodoId) =>
      state.items.entities[id]?.completed,
    todoEntities: (state: State) => state.items.entities,
    todoIds: (state: State) => state.items.ids,
    todoList: selectTodoList,
    visibleTodos: selectVisibleTodos,
    visibleTodosCount: createSelector(
      [selectVisibleTodos],
      (visibleTodos) => visibleTodos.length,
    ),
  },
}).injectInto(rootReducer);

export { todosSlice };
export type { Sort, SortField, SortOrder, Todo, TodoId };
