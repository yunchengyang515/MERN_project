import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED,LOGOUT } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';


// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			//the data passed back will be the user
			data: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};
	const body = JSON.stringify({ name, email, password });
	try {
		const retData = await axios.post('/api/user', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			data: retData.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

//Login
export const login = ({ email, password }) => async dispatch => {
	const config = {
		headers: {
		  'Content-Type': 'application/json'
		}
	  };
	const body = JSON.stringify({ email, password });
	console.log(body)
	try {
		const retData = await axios.post('/api/auth', body, config
		);
		dispatch({
			type: LOGIN_SUCCESS,
			data: retData.data,
		});
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err, 'danger')));
		}
		dispatch({
			type: LOGIN_FAILED,
		});
	}
};

export const logout = ()=>dispatch=>{
	dispatch({
		type:LOGOUT
	})
}