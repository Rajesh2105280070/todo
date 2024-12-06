import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all', // all, active, done
    sort: 'recent', // recent, id
  },
  reducers: {
    setTodos(state, action) {
      state.items = action.payload;  // Here we assume that each todo has userId, title, completed, etc.
    },
    addTodo(state, action) {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        dueDate: action.payload.dueDate, // Add due date if you want
        userId: action.payload.userId,   // Handle userId when adding a new todo
        created_at: dayjs().format(),
        updated_at: dayjs().format(),
      };
      state.items.push(newTodo);
    },
    toggleTodo(state, action) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updated_at = dayjs().format();
      }
    },
    deleteTodo(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo, setFilter, setSort } = todoSlice.actions;
export default todoSlice.reducer;
