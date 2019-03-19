import { apiurl } from '../appconfig';
import { checkAndGetToken, logout, refreshToken } from './authaction';
import { /*photoClear,*/ getPhoto } from './photoaction';

export const FETCH_DISHES_START = 'FETCH_DISHES_START';
export const FETCH_DISHES_SUCCESS = 'FETCH_DISHES_SUCCESS';
export const FETCH_DISHES_FAILED = 'FETCH_DISHES_FAILED';

export const FETCH_CATEGORY_START = 'FETCH_CATEGORY_START';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILED = 'FETCH_CATEGORY_FAILED';

export const CATEGORY_CHANGE_START = 'CATEGORY_CHANGE_START';
export const CATEGORY_CHANGE_SUCCESS = 'CATEGORY_CHANGE_SUCCESS';
export const CATEGORY_CHANGE_FAILED = 'CATEGORY_CHANGE_FAILED';
export const CATEGORY_CHANGE_CLEAR = 'CATEGORY_CHANGE_CLEAR';

export const fetchStart = (id) => ({
    type: FETCH_DISHES_START,
    id
});

export const fetchSuccess = (id, dishes) => ({
    type: FETCH_DISHES_SUCCESS,
    id, dishes
});

export const fetchFailed = (id, error) => ({
    type: FETCH_DISHES_FAILED,
    id, error
});

export const fetchCategoryStart = (id) => ({
    type: FETCH_CATEGORY_START,
    id
});

export const fetchCategorySuccess = (id, category) => ({
    type: FETCH_CATEGORY_SUCCESS,
    id, category
});

export const fetchCategoryFailed = (id, error) => ({
    type: FETCH_CATEGORY_FAILED,
    id, error
});

export const changeCategoryStart = () => ({
    type: CATEGORY_CHANGE_START
});

export const changeCategorySuccess = (success) => ({
    type: CATEGORY_CHANGE_SUCCESS,
    success
});

export const changeCategoryFailed = (error) => ({
    type: CATEGORY_CHANGE_FAILED,
    error
});

export const changeCategoryClear = () => ({
    type: CATEGORY_CHANGE_CLEAR
});

export const createCategoryByRestaurant = (restaurantId, name, image) => (dispatch, getState) => {
    if (!restaurantId) return;
    if (!name) return;
    if (!image) return;

    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }

    dispatch(changeCategoryStart());

    const data = {
        name,
        restaurantId,
        image: new FormData().append('file', image)
    }
    fetch(`${apiurl}/Category/Create`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token.authToken}`,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(changeCategorySuccess('Create was success'));
                return res.json();
            } else if (res.status === 401) {
                dispatch(refreshToken(token, createCategoryByRestaurant, restaurantId, name, image));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(changeCategoryFailed(`Create was failed: ${error.message}`)));
}

export const getDishesByCategory = (id) => (dispatch, getState) => {
    if (!id) return;

    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }
    
    if (getState().dishesData[id] && getState().dishesData[id].loading) return;

    dispatch(fetchStart(id))
    const dishesTest = [
        {
            id: '1',
            name: "Dish1",
            price: 10,
            weight: 100,
            description: "This is Dish1",
            cookingTime: 20,
            imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa"
        },
        {
            id: '2',
            name: "Dish2",
            price: 20,
            weight: 200,
            description: "This is Dish2 LOoasdfgasg asdfgasdfgsdfg asdgfadsfgsadfgb asdgsdfgsdfgs asdfgsdfgsadf ga sdfg afds g asfd ga  dfg adf g dfg  afds gfd ga dfg asdf ga fd gsfd g sfd g afdga df gsfdgaadsfgdfgsdf  asdfasdfasdfasdf asdfasdfasdfasdf asdfasdfasdfasdf asdfasdf",
            cookingTime: 30,
            imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa"
        },
        {
            id: '3',
            name: "Dish3",
            price: 30,
            weight: 300,
            description: "This is Dish3 LOoasdfgasg asdfgasdfgsdfg asdgfadsfgsadfgb asdgsdfgsdfgs asdfgsdfgsadf ga sdfg afds g asfd ga  dfg adf g dfg  afds gfd ga dfg asdf ga fd gsfd g sfd g afdga df gsfdgaadsfgdfgsdf  asdfasdfasdfasdf asdfasdfasdfasdf asdfasdfasdfasdf asdfasdf",
            cookingTime: 15,
            imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa"
        },
        {
            id: '4',
            name: "Dish4",
            price: 40,
            weight: 150,
            description: "This is Dish4 LOoasdfgasg asdfgasdfgsdfg asdgfadsfgsadfgb asdgsdfgsdfgs asdfgsdfgsadf ga sdfg afds g asfd ga  dfg adf g dfg  afds gfd ga dfg asdf ga fd gsfd g sfd g afdga df gsfdgaadsfgdfgsdf  asdfasdfasdfasdf asdfasdfasdfasdf asdfasdfasdfasdf asdfasdf",
            cookingTime: 10,
            imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa"
        }
    ]
    if (Array.isArray(dishesTest)) dishesTest.forEach(dish => dispatch(getPhoto(dish.imageId, token)));
        dispatch(fetchSuccess(id, dishesTest));
    // fetch(`${apiurl}/Dish/GetByCategory?id=${id}`, {
    //     method: 'GET',
    //     headers: new Headers({
    //         'Authorization': `Bearer ${token.authToken}`,
    //     })
    // })
    // .then(res => {
    //     if (res.status === 200) {
    //         return res.json();
    //     } else if (res.status === 401) {
    //         dispatch(refreshToken(token, getDishesByCategory));
    //     } else {
    //         throw new Error(res.statusText);
    //     }
    // })
    // .then(dishes => {
    //     // console.log(dishes);
    //     if (Array.isArray(dishes)) dishes.forEach(dish => dispatch(getPhoto(dish.imageId, token)));
    //     dispatch(fetchSuccess(id, dishesTest));
    // })
    // .catch(error => fetchFailed(id, error.message));
}

export const getCategoryByRestaurant = (id) => (dispatch, getState) => {
    if (!id) return;
    const token = checkAndGetToken(dispatch, getState);
    if (!token) {
        dispatch(logout());
        return;
    }
    
    if (getState().categoryData[id] && getState().categoryData[id].loading) return;

    dispatch(fetchCategoryStart(id))
            const categoryTest = [
            {
                id: '1',
                restaurantId: "86f5c2a3-5013-41d3-999a-b36a3807268a",
                name: "Category1",
                imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa",
            },
            {
                id: '2',
                restaurantId: "86f5c2a3-5013-41d3-999a-b36a3807268a",
                name: "Category1",
                imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa",
            },
            {
                id: '3',
                restaurantId: "86f5c2a3-5013-41d3-999a-b36a3807268a",
                name: "Category1",
                imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa",
            },
            {
                id: '4',
                restaurantId: "86f5c2a3-5013-41d3-999a-b36a3807268a",
                name: "Category1",
                imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa",
            },
            {
                id: '5',
                restaurantId: "86f5c2a3-5013-41d3-999a-b36a3807268a",
                name: "Category1",
                imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa",
            },
            {
                id: '6',
                restaurantId: "86f5c2a3-5013-41d3-999a-b36a3807268a",
                name: "Category1",
                imageId: "93ac9d6f-44a6-4869-868c-0033eb0255fa",
            },
        ]
        if (Array.isArray(categoryTest)) categoryTest.forEach(cat => dispatch(getPhoto(cat.imageId,token)));
        dispatch(fetchCategorySuccess(id, categoryTest));
    // fetch(`${apiurl}/Category/GetByRestaurant?id=${id}`, {
    //     method: 'GET',
    //     headers: new Headers({
    //         'Authorization': `Bearer ${token.authToken}`,
    //     })
    // })
    // .then(res => {
    //     if (res.status === 200) {
    //         return res.json();
    //     } else if (res.status === 401) {
    //         dispatch(refreshToken(token, getCategoryByRestaurant));
    //     } else {
    //         throw new Error(res.statusText);
    //     }
    // })
    // .then(category => {
    //     // console.log(dishes);
    //     if (Array.isArray(category)) category.forEach(cat => dispatch(getPhoto(cat.imageId,token)));
    //     dispatch(fetchCategorySuccess(id, category));
    // })
    // .catch(error => fetchCategoryFailed(id, error.message));
}