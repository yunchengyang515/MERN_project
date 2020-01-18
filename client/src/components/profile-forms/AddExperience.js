import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFightExperience } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Paper, Typography, TextField } from '@material-ui/core';
import Alert from '../layout/Alert';
//Todo:
//1: fix the height
//2: use typography for texts
//3: use material-ui for inputs

const ComponentWrapper = styled(Paper)`
	width: 40% !important;
	left: 30%;
	top: 4%;
	margin-top: 10px !important;
	max-height: 90vh;
	position: absolute;
	@media only screen and (max-width: 600px) {
		width: 80% !important;
		left: 10%;
		top: 4%;
	}
`;
const ContainerWrapper = styled(Container)`
	padding: 15px;
	width: 100%;
	height: 100%;
`;
const SelectWrapper = styled(TextField)`
width:70% !important;
border
`;
const AddExperience = ({ addFightExperience, history }) => {
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		addFightExperience(formData, history);
	};
	const [formData, setFormData] = useState({
		isPro: false,
		discipline: '',
		result: '',
		promotion: '',
	});

	const { isPro, discipline, result, promotion } = formData;

	return (
		<section class="register">
			<Alert />
			<div class="dark-overlay">
				<ComponentWrapper>
					<ContainerWrapper>
						<Alert />
						<h1 class="large text-primary">Add your fight experience</h1>
						<p class="lead">
							<i class="fas fa-user"></i> Fight experience
						</p>
						<form class="form" onSubmit={e => onSubmit(e)}>
							<div class="form-group">
								<Typography>Which promotion the fight belongs to</Typography>
								<SelectWrapper
									type="text"
									placeholder="Fight Promotion"
									value={promotion}
									name="promotion"
									onChange={e => onChange(e)}
								/>
							</div>
							<Typography>* What is the discipline of the fight</Typography>
							<SelectWrapper
								name="discipline"
								select
								required
								value={discipline}
								onChange={e => onChange(e)}
								SelectProps={{
									native: true,
								}}
							>
								<option />
								<option value="Muay Thai">Muay Thai</option>
								<option value="MMA">MMA</option>
								<option value="Boxing">Boxing</option>
								<option value="Others">Others</option>
							</SelectWrapper>
							<div class="form-group">
								<Typography>* Is the fight a pro fight?</Typography>
								<SelectWrapper
									name="isPro"
									select
									required
									value={isPro}
									onChange={e => onChange(e)}
									SelectProps={{
										native: true,
									}}
								>
									<option />
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</SelectWrapper>
							</div>
							<div class="form-group">
								<Typography>Reuslt of the fight</Typography>
								<SelectWrapper
									select
									SelectProps={{
										native: true,
									}}
									name="result"
									value={result}
									onChange={e => onChange(e)}
								>
									<option />
									<option value={'Win by points'}>Win by points</option>
									<option value={'Win by KO/TKO'}>Win by KO/TKO</option>
									<option value={'Lose'}> Lose </option>
									<option value={'Draw'}> Draw </option>
								</SelectWrapper>
							</div>
							<input type="submit" class="btn btn-primary" value="Add fight experience" />
						</form>
					</ContainerWrapper>
				</ComponentWrapper>
			</div>
		</section>
	);
};
//withRouter
export default connect(null, { addFightExperience })(withRouter(AddExperience));
