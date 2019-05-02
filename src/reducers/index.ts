import { combineReducers } from "redux";
import { User } from "../model/user";
import { authReducer } from "./auth.reducer";

export interface IAuthState {
  currentUser?: User,
  errorMessage?: string
} 

export interface IState {
  auth: IAuthState
}

export const state = combineReducers<IState>({
  auth: authReducer
})