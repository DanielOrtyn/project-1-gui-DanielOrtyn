import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { User } from "../model/user";

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
