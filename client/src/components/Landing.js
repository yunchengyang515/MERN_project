import React from 'react';
import Button from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const ComponentWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
`;

const Landing = () => {
	return (
		<section class="landing">
			<ComponentWrapper>
				<div class="landing-inner">
					<h1 class="x-large">Connecting Fighters</h1>
					<p class="lead">Create profile, join the combat community. Find training partners, gyms and more</p>
					<div class="buttons">
						<Link to="/register" class="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" class="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</ComponentWrapper>
		</section>
	);
};

export default Landing;
