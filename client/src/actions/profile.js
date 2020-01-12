import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			data: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			data: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
export const createProfile = (formData, history, edit = false) => async dispatch=>{
	try {
		const config = {
		  headers: {
			'Content-Type': 'application/json'
		  }
		};
		//update the profile with formData and config
		const res = await axios.post('/api/profile', formData, config);

		//get the profile after update
		dispatch({
			type: GET_PROFILE,
			data: res.data,
		});
		
		//setAlert saying the profile is already created, different message
		//depending on if the profile is created or updated
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		//if created a new profile, redirect to dashboard
		if (!edit) {
		  history.push('/dashboard');
		}
	}
	catch(err){
		dispatch({
			type: PROFILE_ERROR,
			data: { msg: err.response.statusText, status: err.response.status },
		});
	}

};

export const addFightExperience = (formData, history) => async dispatch=>{
	try {
		const config = {
		  headers: {
			'Content-Type': 'application/json'
		  }
		};
		//add new experience
		const res = await axios.put('/api/profile/experience', formData, config);

		//get the profile after update
		dispatch({
			type: UPDATE_PROFILE,
			data: res.data,
		});
		
		dispatch(setAlert('Experience added', 'success'));

		//if added a new experience, redirect to dashboard
		
		  history.push('/dashboard');
		}
	
	catch(err){
		dispatch({
			type: PROFILE_ERROR,
			data: { msg: err.response.statusText, status: err.response.status },
		});
	}

};

