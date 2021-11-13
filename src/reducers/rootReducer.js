import {combineReducers} from "redux";
import reducer from "./reducer";

const rootReducer=combineReducers(
    {
        ticker:reducer
    }
)
export default rootReducer;