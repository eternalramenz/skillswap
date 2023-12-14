import authReducer from "./AuthReducer.ts"
import { combineReducers } from "redux";

export const reducers = combineReducers({
  authReducer,
})