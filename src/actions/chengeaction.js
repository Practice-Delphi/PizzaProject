import { apiurl, allroles } from '../appconfig';
import { checkAndGetToken, logout, getUser, refreshToken } from './authaction';

export const UPDATE_FETCH_START = 'UPDATE_FETCH_START';
export const UPDATE_FETCH_SUCCESS = 'UPDATE_FETCH_SUCCESS';
export const UPDATE_FETCH_FAILD = 'UPDATE_FETCH_FAILD';
export const UPDATE_FETCH_CLEAR = 'UPDATE_FETCH_CLEAR';

export const updateStart = () => ({
    type: UPDATE_FETCH_START
});
export const updateSuccess = (success) => ({
    type: UPDATE_FETCH_SUCCESS,
    success
});
export const updateFailed = (error) => ({
    type: UPDATE_FETCH_FAILD,
    error
});

export const clearUpdate = () => ({
    type: UPDATE_FETCH_CLEAR
})

export const chengeUserData = (data) => (dispatch, getState) => {
    if (!data) return;
    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout())
        return;
    }
    let Role = allroles.get(token.role);
    dispatch(updateStart());
    fetch(`${apiurl}/Account/${Role}/Update${Role}`, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data)
    })
        .then(res => {
            // console.log(res);
            if (res.status === 204 || res.status === 200) {
                dispatch(updateSuccess('Update was success'));
                // console.log('WEAREinside');
                dispatch(getUser(token));
            } else if (res.status === 400) {
                return res.json();
            } else if (res.status === 401) {
                dispatch(refreshToken(token, getUser));
            } else {
                throw new Error(res.statusText);
            }
            // console.log(res);
        })
        .then(data => {
            if (data) {
                if (Array.isArray(data[Object.keys(data)[0]])) {
                    dispatch(updateFailed(data[Object.keys(data)[0]][0]));
                }
            }
        })
        .catch(error => dispatch(updateFailed(error.message)));
};
