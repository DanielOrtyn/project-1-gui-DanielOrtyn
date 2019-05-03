import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { state, IState } from './reducers';

const a: any = window;
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk, logger),
    // other store enhancers if any
);

const sessionStorageCurrentUserObj = sessionStorage.getItem('currentUser');
const storedCurrentUser = sessionStorageCurrentUserObj ? JSON.parse(sessionStorageCurrentUserObj) : undefined;
const persistedState: IState = {
    auth: {
        currentUser: storedCurrentUser,
        errorMessage: ''
    }
};
console.log(persistedState);

export const store: Store<any> = createStore(
    state,
    persistedState,
    enhancer
);

store.subscribe(() => {
    sessionStorage.setItem('currentUser', JSON.stringify(store.getState().auth.currentUser))
});
