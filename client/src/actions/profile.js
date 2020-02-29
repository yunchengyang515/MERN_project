import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES } from './types';

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		if (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};

export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.statusText, status: err.status },
		});
	}
};

export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

export const createProfile = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		//update the profile with formData and config
		const res = await axios.post('/api/profile', formData, config);

		//get the profile after update
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		//setAlert saying the profile is already created, different message
		//depending on if the profile is created or updated
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		//if created a new profile, redirect to dashboard
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addFightExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		//add new experience
		const res = await axios.put('/api/profile/experience', formData, config);

		//get the profile after update
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience added', 'success'));

		//if added a new experience, redirect to dashboard

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			data: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await axios.delete('/api/profile');

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert('Your account has been permanently deleted'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};
