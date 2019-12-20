import React, { useState, Fragment } from 'react';
import { Grid, Container, Paper } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom'
const ComponentWrapper = styled(Paper)`
	width: 40% !important;
	height: 55%;
	left: 30%;
	top: 4%;
	margin-top: 10px !important;
	position: absolute;
`;
const ContainerWrapper = styled(Container)`
    padding: 15px;
    width:100%;
    height:100%;
`;
const Login = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
	});
	const { name, email, password, password2 } = formData;

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async e => {
		e.preventDefault();

		console.log(formData);
		const newUser = { name, email, password };
		try {
			// axios example
			// const config ={
			// 	headers:{
			// 		"Content-type":"application/json"
			// 	}
			// }
			// const body =JSON.stringify(newUser);
			// const res = await axios.post("/api/user", body,config);
			// const token = res.data;
			// console.log(token)
		} catch (err) {
			console.error(err.response.msg);
		}
	};
	return (
		<section class="register">
			<div class="dark-overlay">
				<ComponentWrapper>
					<ContainerWrapper>
						<h1 class="large text-primary">Login</h1>
						<p class="lead">
							<i class="fas fa-user"></i> Login with your account
						</p>
						<form class="form" action="create-profile.html" onSubmit={e => handleSubmit(e)}>
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
							</div>
							<input type="submit" class="btn btn-primary" value="Login" />
						</form>
						<p class="my-1">
							Haven't joined us yet? <Link to="/register">Sign Up</Link>
						</p>
					</ContainerWrapper>
				</ComponentWrapper>
			</div>
		</section>
	);
};

export default Login;
