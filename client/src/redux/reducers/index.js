import { combineReducers } from "redux";
import { DESTROY_SESSION } from "../constants/actionTypes"

import post from "./post";
const reducers = combineReducers({ post });

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION) state = undefined;
    return reducers(state, action);
};
export default rootReducer;