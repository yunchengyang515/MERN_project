import React, { useEffect, Fragment } from 'react';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from"../profile/ProfileItem";
import Gallery from './Gallery';
import styled from "styled-components";
import { Container } from "@material-ui/core"
const ComponentWrap = styled(Container)`
max-width: 80vw;
background-color: white;
height:100%;
padding-top:10px;
`
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	
	return loading ? (
		<Spinner />
	) : (
		<section>
		<ComponentWrap container>
			<Gallery style/>
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
		</ComponentWrap>
		</section>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
