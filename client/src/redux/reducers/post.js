import {
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILURE,
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAILURE,
} from "../constants/actionTypes";

const initial_state = {
    items: [],
    error: "",
    isLoading: false,
};

export default (state = initial_state, action) => {
    switch (action.type) {
        case CREATE_ITEM_REQUEST:
            return {
                ...state,
                isLoading: true,
                items: state.items,
            };
        case CREATE_ITEM_SUCCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                items: state.items ? [...state.items, action.payload] : [action.payload],
            };
        case CREATE_ITEM_FAILURE:
            return {
                ...state,
                isLoading: false,
                items: [],
                error: action.payload,
            };
        case FETCH_ALL_REQUEST:
            return {
                ...state,
                isLoading: true,
                items: [...state.items]
            };
        case FETCH_ALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            };
        case FETCH_ALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                items: [],
                error: action.payload,
            };
        default:
            return state;
    }
};