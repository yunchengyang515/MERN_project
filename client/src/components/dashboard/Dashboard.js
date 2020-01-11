import React, { useEffect, Fragment } from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from "../layout/Spinner"
import { Container } from "@material-ui/core"
import styled from "styled-components"
import { DashboardAction } from './DashboardAction';

//use useEffect hook to make sure as soon as the component loads, it will load the
//get profile function
const Dashboard = ({ getCurrentProfile, auth: { user }, profile:{ profile, loading } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);
	const ContentWrapper = styled(Container)`
	max-width:80%;
	background-color:white;
	height:100%
	`
	const ValidProfile = (
		<Fragment>
		<h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
	  <DashboardAction/>
	  </Fragment>
	)

	const InvalidProfile =(
		<Fragment>
			<h1 className="large">No valid profile</h1>
			<Link to="/create-profile" className="btn btn-primary">
				Create profile
			</Link>
		</Fragment>
	)

	return loading && profile===null?<Spinner/> : <section className="landing">
		<ContentWrapper>
		{profile !==null ? ValidProfile:InvalidProfile}
	</ContentWrapper>
	</section>
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateProps = state => ({
	auth: state.auth,
	profile: state.profile,
	loading:state.loading
});
export default connect(mapStateProps, { getCurrentProfile })(Dashboard);
