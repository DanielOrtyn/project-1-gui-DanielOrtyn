import { IAuthState } from ".";
import { authTypes } from "../actions/auth.actions";
import { User } from "../model/user";


const initialState: IAuthState = {
    currentUser: undefined,
    errorMessage: undefined
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.FAILED_TO_LOGIN:
            return {
                ...state,
                errorMessage: 'Failed to Login try again later.'
            }
        case authTypes.INVALID_CREDENTIALS:
            return {
                ...state,
                errorMessage: 'Invalide Credentials'
            }
        case authTypes.LOGGED_IN:
            // ensure that a new undefined user does not get placed into the store if there is a valid one in session storage
            let newUser: User | undefined = action.payload.user
            sessionStorage.setItem("currentUser", JSON.stringify(newUser));
            // send user object, whatever logic dictates it be to the store
            return {
                ...state,
                currentUser: newUser
            }
        case authTypes.LOGGED_OUT:
            sessionStorage.removeItem("currentUser");
            return {
                ...state,
                currentUser: undefined
            }
        default:

    }
    return state;
}