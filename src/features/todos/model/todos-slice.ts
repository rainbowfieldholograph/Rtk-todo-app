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
};
type TodosEntityState = {
  entities: Record<TodoId, Todo>;
  ids: TodoId[]; // Управляет порядком списка
};

type SortField = keyof Pick<Todo, "completed" | "description" | "title">;
type Sort = { field: SortField; order: "asc" | "desc" };

type State = {
  selectedSort: Sort | null;
  items: TodosEntityState;
};

const initialTodos: TodosEntityState = todos.reduce(
  (acc, cur) => {
    acc.entities[cur.id] = cur;
    acc.ids.push(cur.id);
    return acc;
  },
  { entities: {}, ids: [] } as TodosEntityState,
);

const initialState: State = { items: initialTodos, selectedSort: null };

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
        const createdTodo = { id, ...action.payload };

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

        state.items.entities[id] = { ...todo, ...fields };
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
      (state, action: PayloadAction<{ sort: Sort | null }>) => {
        console.log("new sort: ", action.payload.sort);
        state.selectedSort = action.payload.sort;
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
    todoList: createSelector(
      [(state: State) => state.items.entities],
      (entities) => {
        return Object.values(entities);
      },
    ),
    todoCompleted: (state: State, id: TodoId) =>
      state.items.entities[id]?.completed,
    selectedSort: (state: State) => state.selectedSort,
  },
}).injectInto(rootReducer);

export { todosSlice };
export type { Todo, TodoId, SortField, Sort };
