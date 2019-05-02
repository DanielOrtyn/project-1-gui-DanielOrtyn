import { environment } from "../environment";

export const authTypes = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    FAILED_TO_LOGIN: 'FAILED_TO_LOGIN',
    LOGGED_IN: 'LOGGED_IN'
}

export const login = (username: string, password: string, history: any) => async (dispatch) => {
    try {
        const resp = await fetch(environment.context + '/users/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username, password }),
            headers: {
                'content-type': 'application/json'
            }
        })

        if (resp.status === 401) {
            dispatch({
                type: authTypes.INVALID_CREDENTIALS
            })
        } else if (resp.status === 200) {
            const user = await resp.json();
            dispatch({
                payload: {
                    user
                },
                type: authTypes.LOGGED_IN
            })
            // redirect to home page
            history.push('/home');
        } else {
            dispatch({
                type: authTypes.FAILED_TO_LOGIN
            })
            history.push('/home');
        }
    } catch (err) {
        console.log(err);
    }
}