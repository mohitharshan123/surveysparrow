import {
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILURE,
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAILURE,
    DESTROY_SESSION
} from "../constants/actionTypes";

import * as api from "../../api/index.js";
import { toast } from "react-toastify";


const fetchItemsRequest = () => {
    return {
        type: FETCH_ALL_REQUEST,
    };
};


const fetchSuccess = (items) => {
    return {
        type: FETCH_ALL_SUCCESS,
        payload: items,
    };
};


const fetchFailed = (data) => {
    return {
        type: FETCH_ALL_FAILURE,
        payload: data,
    };
};


const createItemRequest = () => {
    return {
        type: CREATE_ITEM_REQUEST,
    };
};

const createItemSuccess = (data) => {
    return {
        type: CREATE_ITEM_SUCCESS,
        payload: data,
    };
};

const createItemFailed = (error) => {
    return {
        type: CREATE_ITEM_FAILURE,
        payload: error,
    };
};


export const onLogout = () => {
    return (dispatch) => {
        dispatch({ type: DESTROY_SESSION });
    };
};



export const getItems = () => {
    return async(dispatch) => {
        dispatch(fetchItemsRequest());
        await api.fetchItems().then(
            (res) => {
                dispatch(fetchSuccess(res.data.items));
            },
            (error) => {
                dispatch(fetchFailed(error));
            }
        );
    }
};

export const createItem = (urlMakeUrl, type, item) => async(dispatch) => {
    dispatch(createItemRequest());
    await api.createItem(urlMakeUrl, type, item).then(
        (res) => {
            toast("Successfully added item");
            dispatch(createItemSuccess(res.data.data));
        },
        (error) => {
            toast("An error occurred, Please try again");
            dispatch(createItemFailed({ "message": "Please try again" }));
        }
    );
};