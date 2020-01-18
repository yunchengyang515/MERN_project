import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles, Hidden } from '@material-ui/core';
import styled from 'styled-components';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: 'white',
	},
	title: {
		flexGrow: 1,
	},
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const LinksWrapper = styled.div`
		display: flex;
		
	`;
	const LinkButton = styled(Button)`
		text-transform: capitalize !important;
	`;
	const classes = useStyles();

	const mapStateToProps = state => ({
		auth: state.auth,
	});

	const guestLinks = (
		<LinksWrapper>
			<LinkButton color="inherit" href="/login">
				
				<Typography variant="subtitle2">login</Typography>
				
			</LinkButton>
			<LinkButton color="inherit" href="/register">
				<Typography variant="subtitle2">Register</Typography>
			</LinkButton>
			<LinkButton color="inherit" href="/profiles">
				<FaceIcon/>
				<Hidden xsDown>
				<Typography variant="subtitle2">Profiles</Typography>
				</Hidden>
			</LinkButton>
		</LinksWrapper>
	);
	const authLinks = (
		<LinksWrapper>
			<LinkButton color="inherit" onClick={logout}>
				<ExitToAppIcon/>
				<Hidden xsDown>
			<Typography variant="subtitle2">logout</Typography>
			</Hidden>
			</LinkButton>
			<LinkButton color="inherit" href="/dashboard">
			<DashboardTwoToneIcon/>
			<Hidden xsDown>
			<Typography variant="subtitle2">dashboard</Typography>
			</Hidden>
			</LinkButton>
			<LinkButton color="inherit" href="/profiles">
				<FaceIcon/>
				<Hidden xsDown>
				<Typography variant="subtitle2">Profiles</Typography>
				</Hidden>
			</LinkButton>
		</LinksWrapper>
	);
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Link className={classes.menuButton} to="/">
					<SportsKabaddiIcon />
				</Link>
				<Typography variant="subtitle1" className={classes.title}>
					FighterConnect
				</Typography>
				{!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
			</Toolbar>
		</AppBar>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	//auth is an object
	auth: PropTypes.object.isRequired,
};

//Here we uses state.auth because we want to access if the user is loading
const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
