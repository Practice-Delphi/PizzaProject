import { apiurl } from '../appconfig';
import { checkAndGetToken, logout, getUser, refreshToken } from './authaction';

export const UPDATE_FETCH_START = 'UPDATE_FETCH_START';
export const UPDATE_FETCH_SUCCESS = 'UPDATE_FETCH_SUCCESS';
export const UPDATE_FETCH_FAILD = 'UPDATE_FETCH_FAILD';

export const updateStart = () => ({
    type: UPDATE_FETCH_START
}) ;
export const updateSuccess = (massage) => ({
    type: UPDATE_FETCH_SUCCESS,
    massage
});
export const updateFailed = (error) => ({
    type: UPDATE_FETCH_FAILD,
    error
});

export const chengeUserData = (data) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    console.log('actoinstarted');
    if (data) {
        if (token) {
            let Role = '';
            switch(token.role) {
            case 'customer': { Role = 'Customer'; break };
            case 'driver': { Role = 'Driver'; break };
            case 'seller': { Role = 'Owner'; break };
            default: { Role = 'Customer' };
        }
            dispatch(updateStart());
            fetch (`${apiurl}/Account/${Role}/Update${Role}`, {
                method: 'PUT',
                headers: new Headers({
                'Authorization': `Bearer ${token.authToken}`,
                'Content-Type': 'application/json',
                }),
                body: JSON.stringify(data)
            })
            .then(res => {
                console.log(res);
                if (res.status === 204 || res.status === 200) {
                    dispatch(updateSuccess('updateSuccess'));
                    console.log('WEAREinside');
                    dispatch(getUser(token));
                } else if (res.status === 400) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getUser));
                } else {
                    throw new Error(res.statusText);
                }
                console.log(res);
                
            })
            .then(data => {
                if (data) {
                    if (Array.isArray(data[Object.keys(data)[0]])) {
                        dispatch(updateFailed(data[Object.keys(data)[0]][0]));
                    }
                }
            })
            .catch(error => dispatch(updateFailed(error.message)));
        }
        else {
            dispatch(logout());
        }
    }
};
