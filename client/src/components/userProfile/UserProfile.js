//react import
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//material ui
import { Container } from "@material-ui/core";

//styled components
import styled from "styled-components";

//redux import
import { getProfileById } from "../../actions/profile";

//Import other components
import ProfileHeader from "../userProfile/ProfileHeader";
import InfoSection from "../userProfile/InfoSection";
import Spinner from "../../components/layout/Spinner";

const ComponentWrap = styled(Container)`
  width: 100%;
  background-color: #f8f5f5;
  padding-bottom: 10px;
  position: relative;
  padding: 0px !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const UserProfile = ({ getProfileById, profile, auth, match }) => {
  //call the redux to get the profile
  const [userProfile, setProfile] = useState({});

  useEffect(() => {
    getProfileById(match.params.id);
    setProfile(profile);
  }, [getProfileById, match.params.id]);
  // checking the where the user is
  if (profile.profile) {
    console.log(profile.profile.user);
  }

  
    if (profile.profile) {
      return (
        <ComponentWrap>
          <ProfileHeader user={profile.profile.user} bio = {profile.profile.bio} />
		   <InfoSection profile ={profile.profile}/>
        </ComponentWrap>
      );
	}
	return <Spinner/>

};

UserProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById
})(UserProfile);
