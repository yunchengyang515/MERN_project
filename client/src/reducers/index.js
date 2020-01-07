import { combineReducers } from 'redux';
import alert from "./alter";
import auth from "./auth"
import profile from "./profile"

export default combineReducers({ alert, auth, profile });