import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth_Redux/reducer";
import { thunk } from "redux-thunk";
import { taskReducer } from "./Task_Redux/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
