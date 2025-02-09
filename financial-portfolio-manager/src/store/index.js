// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioSlice";

// Middleware to save state to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('portfolioState', JSON.stringify(store.getState().portfolio));
  return result;
};

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;