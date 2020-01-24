import React, { useEffect, Fragment } from 'react';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from"../profile/ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			{profiles.length > 0 ? (
				//Due to me messing up the database, some profile belongs to user who
				//already not exist, darn this bug took me a while
				profiles.filter(profile=> profile.user !=null).map(profile =>{
					return(
					<ProfileItem key = {profile._id} profile = {profile}/>
					)
				})
			):
			<h4> Profile not found </h4>

			}
		</Fragment>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
