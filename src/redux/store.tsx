import { combineReducers, configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./reducers";
import chainReducer from "./chainReducer";

const rootReducer = combineReducers({
  tokenbalance: balanceReducer,
  chains: chainReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
