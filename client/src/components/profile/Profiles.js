import React, { useEffect, Fragment} from 'react';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		loading ? <Spinner/> : <Fragment>
			<div>Test</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
