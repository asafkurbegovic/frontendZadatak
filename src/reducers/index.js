import dataReducer from "./data"
import loggedReducer from "./islogged"
import { combineReducers } from 'redux'

const mainReducer = combineReducers({
    data: dataReducer,
    logged: loggedReducer
}) 

export default mainReducer;