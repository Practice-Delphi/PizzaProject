import { apiurl } from '../appconfig';
// Need to take token
import { checkAndGetToken, logout, refreshToken } from './authaction';

import { updateStart, updateSuccess, updateFailed } from './chengeaction';
import { getPhoto } from './photoaction';

export const VEHICLE_FETCH_START = 'VEHICLE_FETCH_START';
export const VEHICLE_FETCH_SUCCESS = 'VEHICLE_FETCH_SUCCESS';
export const VEHICLE_FETCH_FAILED = 'VEHICLE_FETCH_FAILED';
export const VEHICLE_CLEAR = 'VEHICLE_CLEAR';

export const VEHPHOTO_DELETE_ID = 'DELETE_PHOTO_ID';
// TODO: create all action's types

// TODO: create all action's
export const vehicleStart = () => ({
    type: VEHICLE_FETCH_START
})

export const vehicleSuccess = (veh) => ({
    type: VEHICLE_FETCH_SUCCESS,
    veh
});

export const vehicleFailed = (error) => ({
    type: VEHICLE_FETCH_FAILED,
    error
})

export const deletePhotoId = (id) => ({
    type: VEHPHOTO_DELETE_ID,
    id
});

export const vehClear = () => ({
    type: VEHICLE_CLEAR
})

// TODO: actionCreator upload Vehicle info
export const uploadVehicle = (data, file) => (dispatch, getState) => {
    // dispatch(vehicleStart());
    const token = checkAndGetToken(dispatch, getState);
    const checkdata = (data) => {
        if (data.number && data.model && data.brand && data.color) {
            return true;
        }
        return false;
    }
    if (!token) dispatch(logout());
    if (!checkdata(data) && file ) {
        dispatch(updateStart());
        dispatch(uploadVehPhoto(file, token));
    } else {
        dispatch(updateStart());
        fetch(`${apiurl}/Account/Driver/Vehicle/AddVehicle`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.authToken}`,
            }),
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                    if (file) {
                        dispatch(uploadVehPhoto(file, token));
                    } else {
                        dispatch(updateSuccess('Vehicle is update'));
                        dispatch(getVehicle(token));
                    }
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, uploadVehicle, data, file));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                dispatch(updateFailed(data))
            })
            .catch(error => {
                dispatch(updateFailed(error.message));
                // dispatch(vehicleFailed(error.message));
            });
    }
}


// TODO: actionCreator upload Vehicle Photo
export const uploadVehPhoto = (files, token) => (dispatch, getState) => {
    if (files) {
        if (token) {
            const data = new FormData();
            files.forEach(file => {
                data.append('files', file);
            })
            fetch(`${apiurl}/Account/Driver/Vehicle/AddVehicleImage`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.authToken}`,
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(updateSuccess('Vehicle is update'));
                        dispatch(getVehicle(token));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, uploadVehPhoto, files, data));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    dispatch(updateFailed(error.message));
                    dispatch(vehicleFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    }
}


// TODO: actionCreator get Document info 
export const getVehicle = (tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (token) {
        dispatch(vehicleStart());
        // dispatch(vehicleSuccess({
        //     id: "a99109f9-eca3-43b6-a70a-bf26d85f42c8",
        //     number: "number",
        //     model: "model",
        //     brand: "brand",
        //     color: "color",
        //     pictures: [],
        //     driverId: "9d930bc2-4444-4b47-89b4-63113c11414a",
        // }));
        fetch(`${apiurl}/Account/Driver/Vehicle/GetVehicle`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.authToken}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getVehicle));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                dispatch(vehicleSuccess(data));
                if (data.pictures && Array.isArray(data.pictures)) {
                    data.pictures.forEach(id => {
                        dispatch(getPhoto(id, token));
                    });
                }
            })
            .catch(error => dispatch(vehicleFailed(error.message)));
    } else {
        dispatch(logout());
    }
    // dispatch(vehicleSuccess({
    //     id: "70512059-1248-4e4f-9a17-a1527f924ced",
    //     number: "Number",
    //     model: "Model",
    //     brand: "Brand",
    //     color: "Color",
    //     pictures: ["e89ffbc9-cd46-4ef2-a7ee-c6e97dfd4ade.jpeg", "6ddd6713-e010-4007-8524-9f6acab50d23.png", "e89ffbc9-cd46-4ef2-a7ee-c6e97dfd4ade.jpeg"],
    //     driverId: "0e09a93f-5927-41df-8d4b-aba82da9b949",
    // }));
}

// export const deleteVehPhoto = (id) => (dispatch, getState) => {
//     const token = checkAndGetToken(dispatch, getState);
//     if (token) {
//         dispatch(updatestart());
//         fetch(`${apiurl}/api/vehicles/images/${id}`, {
//             method: 'DELETE',
//             headers: new Headers({
//                 'Authorization': `Bearer ${token.authToken}`
//             })
//         })
//             .then(res => {
//                 if (res.status === 200 || res.status === 201 || res.status === 204) {
//                    dispatch(updatesuccess(null));
//                     dispatch(deletePhotoId(id));
//                     dispatch(photoClear(id));
//                 } else if (res.status === 401) {
//                     dispatch(refreshToken(token, deleteVehPhoto, id));
//                 } else {
//                     throw new Error(res.statusText);
//                 }
//             })
//             .catch(error => dispatch(updatefailed(error.message)));
//     } else {
//         dispatch(logout());
//     }
// }