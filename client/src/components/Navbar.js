import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

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
	const classes = useStyles();
	const mapStateToProps = state => ({
		auth: state.auth,
	});
	const guestLink = (	
		<Button color="inherit" href="/login">
			Login
		</Button>
		<Button color="inherit" href="/register">
			register
		</Button>
	);
	const authLink =(
		<Button color="inherit" href="/login">
			Login
		</Button>
		<Button color="inherit" href="/register">
			register
		</Button>
	)
	return (
		<AppBar position="static">
			<Toolbar>
				<Link className={classes.menuButton} to="/">
					<SportsKabaddiIcon />
				</Link>
				<Typography variant="subtitle1" className={classes.title}>
					FighterConncet
				</Typography>

			</Toolbar>
		</AppBar>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	//auth is an object
	auth: PropTypes.object.isRequired
  };
  
//Here we uses state.auth because we want to access if the user is loading
const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
