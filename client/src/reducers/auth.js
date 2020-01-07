import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,LOGOUT} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null, //means not sure
	loading: true,
	user: null,
};
export default function(state = initialState, action) {
	const { type, data } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', data.token);
			return { ...state, data, isAuthenticated: true, loading: false };
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			//here the data will be just the id
			return { ...state, token: null, isAuthenticated: false, loading: false };

		case LOGIN_SUCCESS:
			localStorage.setItem('token', data.token);
			return {
				...state,
				...data,
				isAuthenticated: true,
				loading: false,
			};
		case USER_LOADED:
			return {
			  ...state,
			  isAuthenticated: true,
			  loading: false,
			  user: data
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token:null,
				isAuthenticated: false,
				loading: false,
			};
		
		default:
			return state;
	}
}
