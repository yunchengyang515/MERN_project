import { combineReducers } from 'redux';
import alert from "./alter";
import auth from "./auth"

export default combineReducers({ alert, auth });