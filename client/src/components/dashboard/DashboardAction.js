import React, { Fragment } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import SportsMmaIcon from '@material-ui/icons/SportsMma';

export const DashboardAction = () => {
	const ComponentWrapper = styled(Grid)`
		width: auto;
		height: 30px;
		margin-top: 20px !important;
	`;
	const ButtonWrapper = styled(Button)`
		background-color: #ff4d4d !important;
		color: white !important;
		padding: 3px;
	`;

	

	return (
		<ComponentWrapper container spacing={2}>
            <Grid item>
				<ButtonWrapper className="btn btn-light" href="/edit-profile">
                    <PersonIcon/>
					<Typography variant="button">Edit Profile</Typography>
				</ButtonWrapper>
			</Grid>
            <Grid item>
				<ButtonWrapper className="btn btn-light" href="/add-fight-experience">
                    <SportsMmaIcon/>
					<Typography variant="button">Add Fight Experience</Typography>
				</ButtonWrapper>
			</Grid>
		</ComponentWrapper>
	);
};
