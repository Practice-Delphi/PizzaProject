import { apiurl } from '../appconfig';
import { checkAndGetToken, logout, refreshToken } from './authaction';
import { photoClear, getPhoto } from './photoaction';

export const FETCH_RESTAURANT_START = 'FETCH_RESTAURANT_START';
export const FETCH_RESTAURANT_SUCCESS = 'FETCH_RESTAURANT_SUCCESS';
export const FETCH_RESTAURANT_FAILED = 'FETCH_RESTAURANT_FAILED';

export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';

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

export const deleteRest = (id) => ({
    type: DELETE_RESTAURANT,
    id
});

export const getRestaurants = () => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }

    dispatch(fetchStart());
    // dispatch(fetchSuccess([
    //     {
    //         id: "testid",
    //         name: "TestName",
    //         ownerId: "fafd0e67-5f56-4ce3-a637-bd6754965c65",
    //         logoImageId: null,
    //         location: {
    //           latitude: 49.23,
    //           longitude: 28.46,
    //         },
    //         description: "TestDesc",
    //         rating: 5
    //       }
    // ]));
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
            //dispatch(fetchSuccess(data));
            // data[0] = Object.assign(data[0], { images: [ '3bb3e9bc-01e6-47b5-af97-04a65c033f03', '3bb3e9bc-01e6-47b5-af97-04a65c033f03', '3bb3e9bc-01e6-47b5-af97-04a65c033f03', '3bb3e9bc-01e6-47b5-af97-04a65c033f03', '3bb3e9bc-01e6-47b5-af97-04a65c033f03']})
            // data[1] = data[0];
            dispatch(fetchSuccess(data));
            data.forEach(restaurant => {
                const { logoImageId, images } = restaurant;
                if (logoImageId) {
                    dispatch(getPhoto(logoImageId, token));
                }
                if (images && Array.isArray(images)) {
                    images.forEach(image => dispatch(getPhoto(image, token)));
                }
            })
        })
        .catch(error => {
            dispatch(fetchFailed(error.message));
        });
}

export const createRestaurant = (data, logo, photos) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }
    dispatch(changeStart());
    fetch(`${apiurl}/Restaurant/Create`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.authToken}`,
        }),
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200 ) {
                return res.json();
            } else if (res.status === 401) {
                dispatch(refreshToken(token, createRestaurant, data, logo, photos));
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(id => {
            return Promise.all([dispatch(setLogo(logo, id, token)), dispatch(addImages(photos, id, token))]);
        })
        .then(() => {
            dispatch(changeSuccess('Restaurant was create'));
            dispatch(getRestaurants());
        })
        .catch(error => dispatch(changeFailed(error.message)));
}

export const updateRestaurant = (id, data, logo, photos) => (dispatch, getState) => {

}

export const setLogo = (logo, id, tok) => (dispatch, getState) => {
    if (!logo) return;

    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }

    const data = new FormData();
    data.append('file', logo);
    dispatch(logoStart());
    return fetch(`${apiurl}/Restaurant/SetLogo?Id=${id}`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`,
        }),
        body: data
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                dispatch(logoSuccess("Logo was upload"));
                return 'Logo was upload';
            } else if (res.status === 401) {
                dispatch(refreshToken(token, setLogo, logo));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(logoFailed(error.message)));
}

export const addImages = (photos, id, tok) => (dispatch, getState) => {
    if (!photos) return;

    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }

    const data = new FormData();
    photos.forEach(file => {
        data.append('files', file);
    })
    dispatch(photosStart());
    return fetch(`${apiurl}/Restaurant/AddImages?Id=${id}`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`,
        }),
        body: data
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                dispatch(photosSuccess("Photos were upload"));
                return 'Photos were upload';
            } else if (res.status === 401) {
                dispatch(refreshToken(token, addImages, photos));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(photosFailed(error.message)));
}

export const deleteImage = (id) => (dispatch, getState) => {
    if (!id) return;
    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }

    dispatch(photosStart());
    return fetch(`${apiurl}/Restaurant/RemoveImage?imageId=${id}`, {
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
}

export const deleteRestaurant = (id) => (dispatch, getState) => {
    if (!id) return;
    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }
    dispatch(changeStart());
    return fetch(`${apiurl}/Restaurant/Remove?id=${id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`
        })
    })
        .then(res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                dispatch(changeSuccess("Restaurant was delete"));
                dispatch(deleteRest(id));
            } else if (res.status === 401) {
                dispatch(refreshToken(token, deleteRestaurant, id));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(changeFailed(error.message)));
}