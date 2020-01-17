import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
	Hidden,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableContainer,
	Paper,
	Typography,
} from '@material-ui/core';
import styled from 'styled-components';

const ContainerWrapper = styled(TableContainer)`
	min-width: 90% !important;
`;
const TableWrapper = styled(Table)`
	width: 80%;
	font-size: 20px;
`;
const TextWrapper = styled(Typography)`
	margin-top: 2.5rem !important;
	margin-bottom: 1.5rem !important;
	color: #343a40;
`;
const Experience = ({ experience }) => {
	console.log(experience);

	const DisplayExperience = experience.filter(exp=> exp.discipline != undefined).map(exp => (
		<TableRow>
			<TableCell>
				<Typography>{exp.promotion? exp.promotion : "--"}</Typography>
			</TableCell>
			<TableCell>
				<Typography>{exp.discipline}</Typography>
			</TableCell>
			<TableCell>
				<Typography>{exp.isPro ? 'Pro' : 'Amateur'}</Typography>
			</TableCell>
			<TableCell>
				<Typography>{exp.result}</Typography>
			</TableCell>
		</TableRow>
	));
	return (
		<Fragment>
			<TextWrapper variant="h5"> Fight Experience </TextWrapper>
			<ContainerWrapper component={Paper}>
				<TableWrapper>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="h6">Promotion</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Discipline</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Pro/Amateur</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6">Result</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{DisplayExperience}</TableBody>
				</TableWrapper>
			</ContainerWrapper>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
};

export default Experience;
