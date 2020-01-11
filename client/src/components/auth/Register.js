import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { Container, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const ComponentWrapper = styled(Paper)`
	width: 40% !important;
	height: 80%;
	left: 30%;
	top: 4%;
	margin-top: 10px !important;
	position: absolute;
	@media only screen and (max-width: 600px) {
		width: 80% !important;
		left: 10%;
		top: 4%;
	}
`;
const ContainerWrapper = styled(Container)`
	padding: 15px;
`;

const Register = props => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = formData;

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			//try it without redux first
			props.setAlert('Password does not match', 'danger');
		} else {
			//this redux action takes care of axios post
			props.register({ name, email, password });
			// const newUser = { name, email, password };
			// try {
			// 	// axios example
			// 	// const config ={
			// 	// 	headers:{
			// 	// 		"Content-type":"application/json"
			// 	// 	}
			// 	// }
			// 	// const body =JSON.stringify(newUser);
			// 	// const res = await axios.post("/api/user", body,config);
			// 	// const token = res.data;
			// 	// console.log(token)
			// } catch (err) {
			// 	console.error(err.response.msg);
			// }
		}
	};
	if (props.isAuthenticated === true) {
		return <Redirect to="/" />;
	}
	return (
		<section class="register">
			<div class="dark-overlay">
				<ComponentWrapper>
					<ContainerWrapper>
						<Alert/>
						<h1 class="large text-primary">Sign Up</h1>
						<p class="lead">
							<i class="fas fa-user"></i> Create Your Account
						</p>
						<form class="form" onSubmit={e => handleSubmit(e)}>
							<div class="form-group">
								<input
									type="text"
									placeholder="Name"
									name="name"
									required
									onChange={e => handleChange(e)}
								/>
							</div>
							<div class="form-group">
								<input
									type="email"
									placeholder="Email Address"
									name="email"
									onChange={e => handleChange(e)}
								/>
								<small class="form-text">
									This site uses Gravatar so if you want a profile image, use a Gravatar email
								</small>
							</div>
							<div class="form-group">
								<input
									type="password"
									placeholder="Password"
									name="password"
									minLength="6"
									onChange={e => handleChange(e)}
								/>
							</div>
							<div class="form-group">
								<input
									type="password"
									placeholder="Confirm Password"
									name="password2"
									minLength="6"
									onChange={e => handleChange(e)}
								/>
							</div>
							<input type="submit" class="btn btn-primary" value="Register" />
						</form>
						<p class="my-1">
							Already have an account? <Link to="/login">Log In</Link>
						</p>
					</ContainerWrapper>
				</ComponentWrapper>
			</div>
		</section>
	);
};
const mapStateToProps = state => ({
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
