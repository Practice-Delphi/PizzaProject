import { apiurl } from '../appconfig';
// Need to take token
import { checkAndGetToken, logout, refreshToken } from './authaction';

import { updateStart, updateSuccess, updateFailed } from './chengeaction';
import { getPhoto } from './photoaction';

export const DOCUMENT_FETCH_START = 'DOCUMENT_FETCH_START';
export const DOCUMENT_FETCH_SUCCESS = 'DOCUMENT_FETCH_SUCCESS';
export const DOCUMENT_FETCH_FAILED = 'DOCUMENT_FETCH_FAILED';
export const DOCPHOTO_FETCH_START = 'DOCPHOTO_FETCH_START';
export const DOCPHOTO_FETCH_SUCCESS = 'DOCPHOTO_FETCH_SUCCESS';
export const DOCPHOTO_FETCH_FAILED = 'DOCPHOTO_FETCH_FAILED';
export const DOCUMENT_CLEAR = 'DOCUMENT_CLEAR';
// TODO: create all action's types

// TODO: create all action's
const docStart = () => ({
    type: DOCUMENT_FETCH_START
});

const docSuccess = (doc) => ({
    type: DOCUMENT_FETCH_SUCCESS,
    doc
});

const docFailed = (error) => ({
    type: DOCUMENT_FETCH_FAILED,
    error
});

export const docClear = () => ({
    type: DOCUMENT_CLEAR
});

// TODO: actionCreator upload Document info
export const uploadDocument = (front, back) => (dispatch, getState) => {
    // dispatch(docStart());
    const token = checkAndGetToken(dispatch, getState);
    if (!front && !back) return;
    if (!token) {
        dispatch(logout());
        return;
    }
    dispatch(updateStart());
    Promise.all([uploadDocumentImage(front, 'Front', token, dispatch, getState),
                uploadDocumentImage(back, 'Back', token, dispatch, getState)])
        .then(res => {
            dispatch(updateSuccess('License is updated'));
        })
        .catch(error => {
            dispatch(updateFailed('License update failed'));
        })
}

export const uploadDocumentImage = (file, type, tok, dispatch, getState) => {
    if (!file) return;
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    const data = new FormData();
    data.append('file', file);
    return fetch(`${apiurl}/Account/Driver/License/Add${type}Image`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`
        }),
        body: data
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                return
            } else if (res.status === 401) {
                dispatch(refreshToken(token, uploadDocumentImage, file));
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (data && Array.isArray(data[Object.keys(data)[0]])) {
                throw new Error(data[Object.keys(data)[0]][0]);
            }
            return 'Success';
        })
        .catch(error => { throw new Error(error) });
}

// TODO: actionCreator get Document info 
export const getDocument = (tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);

    if (!token) {
        dispatch(logout());
        return;
    }

    dispatch(docStart());
    fetch(`${apiurl}/Account/Driver/License/GetLicense`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`
        })
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 204) {
                dispatch(docSuccess(null));
            } else if (res.status === 401) {
                dispatch(refreshToken(token, getDocument));
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            dispatch(docSuccess(data));
            dispatch(getPhoto(data.frontImage, token));
            dispatch(getPhoto(data.backImage, token));
        })
        .catch(error => dispatch(docFailed(error.message)));
}

// TODO: actionCreator get Document phoho
// export const getDocPhoto = (tok, id) => (dispatch, getState) => {
//     const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
//     if (token) {
//         dispatch(docphotoStart());
//         fetch(`${apiurl}/api/images/${id}`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Authorization': `Bearer ${token.auth_token}`
//             })
//         })
//             .then(res => {
//                 if (res.status === 401) {
//                     dispatch(refreshToken(token, getDocPhoto, null, id));
//                 } else if (res.status === 404) {
//                     dispatch(docphotoSuccess(null, null));
//                     return null
//                 } else if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
//                     return res.blob();
//                 } else {
//                     throw new Error(res.statusText);
//                 }
//             })
//             .then(blob => {
//                 if (blob) {
//                     const url = URL.createObjectURL(blob);
//                     dispatch(docphotoSuccess(blob, url));
//                 }
//             })
//             .catch(error => dispatch(docphotoFailed(error.message)));
//     } else {
//         dispatch(logout());
//     }
// }