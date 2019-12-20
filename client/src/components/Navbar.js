import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import { Link } from 'react-router-dom';

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

const Navbar = () => {
	const classes = useStyles();
	return (
		<AppBar position="static">
			<Toolbar>
				<Link className={classes.menuButton} to="/">
					<SportsKabaddiIcon />
				</Link>
				<Typography variant="subtitle1" className={classes.title}>
					FighterConncet
				</Typography>
				<Button color="inherit" href="/login">
					Login
				</Button>
				<Button color="inherit" href="/register">
					register
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
