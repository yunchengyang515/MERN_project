import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const ComponentWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
`;

const Landing = ({ isAuthenticated }) => {

	if(isAuthenticated){
		return <Redirect to="/dashboard"/>
	}
	const guestContent = (
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
	);
	return (
		<section class="landing">
			<ComponentWrapper>{guestContent}</ComponentWrapper>
		</section>
	);
};
Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
