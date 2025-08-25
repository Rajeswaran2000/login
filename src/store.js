import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('users');
    return serializedState ? { users: JSON.parse(serializedState) } : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.users);
    localStorage.setItem('users', serializedState);
  } catch {}
};

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export default store;