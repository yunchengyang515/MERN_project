//react import
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//material ui
import { Container } from "@material-ui/core"

//styled components
import styled from 'styled-components';

//redux import
import { getProfileById } from '../../actions/profile';

const ComponentWrap = styled(Container)`
	max-width: 80vw;
	background-color: #f8f5f5;
	padding-top: 10px;
	padding-bottom: 10px;
	position: relative;
`;

const UserProfile = ({ getProfileById, profile, auth, match }) => {
    //call the redux to get the profile
    
	useEffect(() => {
		getProfileById(match.params.id);
		console.log(profile);
	}, [getProfileById, match.params.id]);

	return (
    <ComponentWrap><div>id {match.params.id}</div></ComponentWrap>)
};

UserProfile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(UserProfile);
