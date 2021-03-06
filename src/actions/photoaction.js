import { apiurl } from '../appconfig';
import { checkAndGetToken, logout, getUser, refreshToken } from './authaction';
import { updateStart, updateSuccess, updateFailed } from './chengeaction';

export const PHOTO_FETCH_START = 'PHOTO_FETCH_START';
export const PHOTO_FETCH_SUCCESS = 'PHOTO_FETCH_SUCCESS';
export const PHOTO_FETCH_FAILED = 'PHOTO_FETCH_FAILED';
export const FETCH_PHOTO_CLEAR = 'FETCH_PHOTO_CLEAR';

export const photoStart = (id) => ({
    type: PHOTO_FETCH_START,
    id
});
export const photoSuccess = (id, url) => ({
    type: PHOTO_FETCH_SUCCESS,
    id,
    url
});

export const photoFailed = (id, error) => ({
    type: PHOTO_FETCH_FAILED,
    id,
    error
});

export const photoClear = (id) => ({
    type: FETCH_PHOTO_CLEAR,
    id
});

export const getPhoto = (id, tok) => (dispatch, getState) => {
    const { photosData } = getState();
    if (!id) return;
    if (id && (!photosData[id] || photosData[id].error)) {
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(photoStart(id));
            fetch (`${apiurl}/GetImage/${id}`, {
                method : 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.authToken}`,
                    }),
            })
            .then (res => {
                if (res.status === 200){
                    return res.blob();
                }
                else if (res.status === 401) {
                    dispatch(refreshToken(token, getPhoto, id));   
                }
                else if (res.status === 404) {
                    dispatch(photoSuccess(id, null));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(blob => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    dispatch(photoSuccess(id, url));
                }
                else {
                    dispatch(photoSuccess(id, null));
                }
            })
            .catch(error => dispatch(photoFailed(id, error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const uploadProfilePhoto = (file, tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (file) {
        if (token) {
            dispatch(updateStart());
            const data = new FormData();
            data.append('file', file);
            dispatch(photoStart());
            return fetch(`${apiurl}/profile/SetProfilePicture`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.authToken}`,

                }),
                body: data
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, uploadProfilePhoto, file));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    dispatch(updateSuccess('Photo is updated'))
                    dispatch(getUser());
                })
                .catch((error) => {
                    dispatch(updateFailed(error.message));
                    dispatch(photoFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    } else {
        dispatch(updateFailed('no file choosed'))
    }
}