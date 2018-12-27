export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_ERROR';
export const USER_DELETE = 'USER_DELETE';

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_START = 'TOKEN_START';
export const TOKEN_FAILED = 'TOKEN_FAILED';
export const TOKEN_DELETE = 'TOKEN_DELETE';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CLEAR_ALL = 'CLEAR_ALL';

export const userStart = () => ({
    type: USER_FETCH_START
});

export const userSuccess = (user) => ({
    type: USER_FETCH_SUCCESS,
    user
});

export const userFailed = (error) => ({
    type: USER_FETCH_FAILED,
    error
});

export const userDelete = () => ({
    type: USER_DELETE
});

export const registerStart = () => ({
    type: USER_REGISTER_START
});

export const registerSuccess = (message) => ({
    type: USER_REGISTER_SUCCESS,
    message
});

export const registerFailed = (error) => ({
    type: USER_REGISTER_FAILED,
    error
});

export const tokenStart = () => ({
    type: TOKEN_START
});

export const tokenSuccess = (token) => ({
    type: TOKEN_SUCCESS,
    token
});

export const tokenFailed = () => ({
    type: TOKEN_FAILED
});

export const tokenDelete = () => ({
    type: TOKEN_DELETE
})

export const clearAll = () => ({
    type: CLEAR_ALL
})

export const checkAndGetToken = (dispatch, getState) => {
    if (getState().tokenData.token) {
        return getState().tokenData.token;
    }
    if (localStorage.getItem('Taxi_Token')) {
        const token = JSON.parse(localStorage.getItem('Taxi_Token'));
        dispatch(tokenSuccess(token));
        return token;
    }
    return null;
}

export const refreshToken = (tok, action, ...actionparams) => (dispatch, getState) => {
    if (!getSatate().tokenData.loading) {
        dispatch(tokenStart());
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token && token.refresh_token ) {
            const refresh = token.refresh_token
        }
    }
}