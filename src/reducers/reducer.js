import obj from "../initialState.js";
import * as actionTypes from "../actionTypes";

export default function (state=obj.ticker,action){
    switch (action.type){
        case actionTypes.SET_HIGH:{
            return {...state,high:action.payload}
        }
        break;
        case actionTypes.SET_LOW:{
            return {...state,low:action.payload}

        }
        break;
        case actionTypes.SET_CURRENT_PRICE:{
            return {...state,currentPrice:action.payload}

        }
        break;
        case actionTypes.SET_PERCENTAGE:{
            return {...state,percentageChange:action.payload}

        }
        break;
        case actionTypes.SET_VOLUME:{
            return {...state,volume:action.payload}

        }
        break;
        default:{
            return {...state}
        }
    }
} 