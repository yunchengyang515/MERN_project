import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Container, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { DashboardAction } from './DashboardAction';
import Experience from './Experience';
import Alert from '../layout/Alert';

//use useEffect hook to make sure as soon as the component loads, it will load the
//get profile function
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	const ContentWrapper = styled(Container)`
		max-width: 80%;
		background-color: white;
		height: 100%;
	`;
	const LeadWrapper = styled(Typography)`
		padding-top: 15px !important;
		color: #ff4d4d !important;
		font-weight: 400 !important;
		margin-bottom: 10px !important;
	`;

	const InvalidProfile = (
		<Fragment>
			<h1 className="large">No valid profile</h1>
			<Link to="/create-profile" className="btn btn-primary">
				Create profile
			</Link>
		</Fragment>
	);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<section className="landing">
			
			<ContentWrapper>
			<Alert/>
				{profile !== null ? (
					<Fragment>
						
						<LeadWrapper variant="h2">Dashboard</LeadWrapper>
						<Typography variant="h4">Welcome {user && user.name}</Typography>
						<DashboardAction />
						{profile.experience !== null &&<Experience experience={profile.experience} />}
						
					</Fragment>
				) : (
					InvalidProfile
				)}
			</ContentWrapper>
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateProps = state => ({
	auth: state.auth,
	profile: state.profile,
	loading: state.loading,
});
export default connect(mapStateProps, { getCurrentProfile })(Dashboard);
