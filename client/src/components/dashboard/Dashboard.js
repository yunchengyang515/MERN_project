import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

//use useEffect hook to make sure as soon as the component loads, it will load the
//get profile function
const Dashboard = ({ getCurrentProfile, auth, profile }) => {
	
	useEffect(() => {
		getCurrentProfile();
	}, []);

	return <div>dashboard</div>;
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateProps = state => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateProps, { getCurrentProfile })(Dashboard);
