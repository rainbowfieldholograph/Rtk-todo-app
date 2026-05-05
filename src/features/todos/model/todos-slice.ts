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

type State = {
  entities: Record<TodoId, Todo>;
  ids: TodoId[];
};

const initialTodos: State = todos.reduce(
  (acc, cur) => {
    acc.entities[cur.id] = cur;
    acc.ids.push(cur.id);
    return acc;
  },
  { entities: {}, ids: [] } as State,
);

const initialState: State = initialTodos;

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

        state.entities[id] = createdTodo;
        state.ids.push(id);
      },
    );

    const removeTodo = create.reducer(
      (state, action: PayloadAction<{ id: TodoId }>) => {
        const { id } = action.payload;

        delete state.entities[id];

        const todoIndex = state.ids.findIndex((todoId) => todoId === id);
        if (todoIndex === -1) return;

        state.ids.splice(todoIndex, 1);
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

        const todo = state.entities[id];
        if (!todo) return;

        state.entities[id] = { ...todo, ...fields };
      },
    );

    const toggleTodoCompleted = create.reducer(
      (state, action: PayloadAction<{ id: TodoId; completed?: boolean }>) => {
        const { id, completed } = action.payload;

        const todo = state.entities[id];
        if (!todo) return;

        todo.completed = completed ?? !todo.completed;
      },
    );

    return { createTodo, removeTodo, editTodo, toggleTodoCompleted };
  },
  selectors: {
    todoEntities: (state: State) => state.entities,
    todoIds: (state: State) => state.ids,
    todoList: createSelector([(state: State) => state.entities], (entities) => {
      return Object.values(entities);
    }),
    todoCompleted: (state: State, id: TodoId) => state.entities[id]?.completed,
  },
}).injectInto(rootReducer);

export { todosSlice };
export type { Todo, TodoId };
