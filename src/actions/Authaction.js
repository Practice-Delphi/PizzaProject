import { apiurl } from '../appconfig';
import { getPhoto } from './photoaction'

export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_ERROR';

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_START = 'TOKEN_START';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CLEAR_ALL = 'CLEAR_ALL';


/*  Need tp storage in local Storage */
export const tokenStorageKey = 'TaxiEats_Token';

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

export const clearAll = () => ({
    type: CLEAR_ALL
});

export const checkAndGetToken = (dispatch, getState) => {
    if (getState().tokenData.token) {
        return getState().tokenData.token;
    }
    if (localStorage.getItem(tokenStorageKey)) {
        const token = JSON.parse(localStorage.getItem(tokenStorageKey));
        dispatch(tokenSuccess(token));
        return token;
    }
    return null;
}

export const refreshToken = (tok, action, ...actionparams) => (dispatch, getState) => {
    console.log('refresh');
    if (!getState().tokenData.loading) {
        dispatch(tokenStart());
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token) {
            const data = {
                authToken: token.authToken,
                refreshToken: token.refreshToken
            }
            return fetch(`${apiurl}/Refresh`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(data),
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(newtoken => {
                    newtoken.role = token.role;
                    newtoken.id = token.id;
                    dispatch(tokenSuccess(newtoken));
                    if (action) {
                        dispatch(action(...actionparams));
                    }
                })
                .catch(error => dispatch(logout()));
        } else {
            dispatch(logout());
        }
    }
}

export const logout = () => (dispatch) => {
    dispatch(clearAll());
}

export const registerUser = (role, regdata) => (dispatch, getState) => {
    dispatch(registerStart());

    let Role = null;
    switch(role) {
        case 'customer': { Role = 'Customer'; break };
        case 'driver': { Role = 'Driver'; break };
        case 'seller': { Role = 'Owner'; break };
        default: { Role = 'Customer' };
    }
    const url = `${apiurl}/Register/${Role}`;

    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            console.log(data);
            if (Array.isArray(data[Object.keys(data)[0]])) {
                dispatch(registerFailed(data[Object.keys(data)[0]][0]));
            } else {
                dispatch(registerSuccess('Registration complete'));
                data.role = role;
                dispatch(tokenSuccess(data));
                dispatch(getUser(data));
            }
        })
        .catch(error => { dispatch(registerFailed(error.message)) });
}

export const loginUser = (logdata, role) => (dispatch, getState) => {
    dispatch(tokenStart());
    return fetch(`${apiurl}/Login`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(logdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(token => {
            console.log(token);
            if (token.authToken) {
                token.role = role;
                dispatch(tokenSuccess(token));
                dispatch(getUser(token));
            } else {
                dispatch(tokenFailed());
                // console.log(token[Object.keys(token)[0]][0]);
                dispatch(userFailed(token[Object.keys(token)[0]][0]));
            }
        })
        .catch(error => {
            dispatch(tokenFailed());
            dispatch(userFailed(error.message));
            // dispatch(logout());
        });
}


export const getUser = (tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (token) {
        let Role = '';
        switch(token.role) {
            case 'customer': { Role = 'Customer'; break };
            case 'driver': { Role = 'Driver'; break };
            case 'seller': { Role = 'Owner'; break };
            default: { Role = 'Customer' };
        }

        dispatch(userStart());

        return fetch(`${apiurl}/Account/${Role}/Get${Role}`, {
            method: 'GET',
            // mode: 'no-cors',
            headers: new Headers({
                'Authorization': `Bearer ${token.authToken}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json();
                } else if (res.status === 404) {
                    dispatch(userFailed(res.statusText));
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getUser));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (data) {
                    data.role = token.role;
                    dispatch(userSuccess(data));
                    console.log(data.profileImageId);
                    if (data.profileImageId) {
                        
                        dispatch(getPhoto(data.profileImageId, token));
                    }
                }
            })
            .catch(error => dispatch(userFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

