import axios from 'axios';
import { setAlert } from './alert';
import { CREATE_POST } from './types';

apiKey = process.env.API_KEY;
export const createPost = (formData, history, userId)=>{
    try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		//update the profile with formData and config
		const res = await axios.post('/api/post', formData, config);

        dispatch({
			type: CREATE_POST,
			payload: res.data,
		});
		//setAlert saying the profile is already created, different message
		//depending on if the profile is created or updated
		dispatch(setAlert("Post Created", 'success'));

		//if created a new profile, redirect to dashboard
		history.push("/posts")
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

	}
}
