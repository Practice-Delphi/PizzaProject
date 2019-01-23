import { apiurl } from '../appconfig';
import { checkAndGetToken, logout, refreshToken } from './authaction';
import { photoClear } from './photoaction';

export const FETCH_RESTAURANT_START = 'FETCH_RESTAURANT_START';
export const FETCH_RESTAURANT_SUCCESS = 'FETCH_RESTAURANT_SUCCESS';
export const FETCH_RESTAURANT_FAILED = 'FETCH_RESTAURANT_FAILED';

export const RESTAURANT_CHANGE_START = 'RESTAURANT_CHANGE_START';
export const RESTAURANT_CHANGE_SUCCESS = 'RESTAURANT_CHANGE_SUCCESS';
export const RESTAURANT_CHANGE_FAILED = 'RESTAURANT_CHANGE_FAILED';

export const RESTAURANT_LOGOUPLOAD_START = 'RESTAURANT_LOGOUPLOAD_START';
export const RESTAURANT_LOGOUPLOAD_SUCCESS = 'RESTAURANT_LOGOUPLOAD_SUCCESS';
export const RESTAURANT_LOGOUPLOAD_FAILED = 'RESTAURANT_LOGOUPLOAD_FAILED';

export const RESTAURANT_PHOTOSUPLOAD_START = 'RESTAURANT_PHOTOSUPLOAD_START';
export const RESTAURANT_PHOTOSUPLOAD_SUCCESS = 'RESTAURANT_PHOTOSUPLOAD_SUCCESS';
export const RESTAURANT_PHOTOSUPLOAD_FAILED = 'RESTAURANT_PHOTOSUPLOAD_FAILED';

export const RESTAURANT_UPDATE_START = 'RESTAURANT_UPDATE_START';
export const RESTAURANT_UPDATE_SUCCESS = 'RESTAURANT_UPDATE_SUCCESS';
export const RESTAURANT_UPDATE_FAILED = 'RESTAURANT_UPDATE_FAILED';

export const fetchStart = () => ({
    type: FETCH_RESTAURANT_START
});

export const fetchSuccess = (restaurants) => ({
    type: FETCH_RESTAURANT_SUCCESS,
    restaurants
});

export const fetchFailed = (error) => ({
    type: FETCH_RESTAURANT_FAILED,
    error
});

export const changeStart = () => ({
    type: RESTAURANT_CHANGE_START
});

export const changeSuccess = (success) => ({
    type: RESTAURANT_CHANGE_SUCCESS,
    success
});

export const changeFailed = (error) => ({
    type: RESTAURANT_CHANGE_FAILED,
    error
});

export const logoStart = () => ({
    type: RESTAURANT_LOGOUPLOAD_START
});

export const logoSuccess = (success) => ({
    type: RESTAURANT_LOGOUPLOAD_SUCCESS,
    success
});

export const logoFailed = (error) => ({
    type: RESTAURANT_LOGOUPLOAD_FAILED,
    error
});

export const photosStart = () => ({
    type: RESTAURANT_PHOTOSUPLOAD_START
});

export const photosSuccess = (success) => ({
    type: RESTAURANT_PHOTOSUPLOAD_SUCCESS,
    success
});

export const photosFailed = (error) => ({
    type: RESTAURANT_PHOTOSUPLOAD_FAILED,
    error
});

export const getRestaurants = () => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    dispatch(fetchStart());
    if (token) {
        fetch(`${apiurl}/Restaurant/GetByOwner`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.authToken}`,
            }),
        })
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getRestaurants));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                dispatch(fetchSuccess(data));
            })
            .catch(error => {
                dispatch(fetchFailed(error.message));
            });
    } else {
        dispatch(logout());
    }
}

export const createRestaurant = (data, logo, photos) => (dispatch, getState) => {

}

export const updateRestaurant = (id, data, logo, photos) => (dispatch, getState) => {

}

export const setLogo = (logo, tok) => (dispatch, getState) => {
    if (logo) {
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token) {
            const data = new FormData();
            data.append('files', logo);
            dispatch(logoStart());
            fetch(`${apiurl}/Restaurant/SetLogo`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.authToken}`,
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(logoSuccess("Logo was upload"));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, setLogo, logo));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(logoFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const addImages = (photos, tok) => (dispatch, getState) => {
    if (logo) {
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token) {
            const data = new FormData();
            photos.forEach(file => {
                data.append('files', file);
            })
            dispatch(photosStart());
            fetch(`${apiurl}/Restaurant/AddImages`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.authToken}`,
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(photosSuccess("Photos were upload"));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, setLogo, logo));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(photosFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const deleteImage = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(photosStart());
            fetch(`${apiurl}/Restaurant/RemoveImage?imageId=${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(photosSuccess("Photo was delete"));
                        dispatch(photoClear(id));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, deleteImage, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(photosFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const deleteRestaurant = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/Restaurant/Remove?id=${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess("Restaurant was delete"));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, deleteRestaurant, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}