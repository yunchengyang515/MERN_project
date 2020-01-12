import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFightExperience } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Paper } from '@material-ui/core';
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
			<div class="dark-overlay">
				<ComponentWrapper>
					<ContainerWrapper>
						<Alert/>
						<h1 class="large text-primary">Add your fight experience</h1>
						<p class="lead">
							<i class="fas fa-user"></i> Fight experience
						</p>
						<form class="form" onSubmit={e => onSubmit(e)}>
							<div class="form-group">
								<input
									type="text"
									placeholder="Fight Promotion"
									value={promotion}
									name="promotion"
									onChange={e => onChange(e)}
								/>
							</div>
							<div className="form-group">
								<select name="discipline" value={discipline} onChange={e => onChange(e)}>
									<option value="0">* Select discipline of the fight</option>
									<option value="Train To Fight">Muay Thai</option>
									<option value="Train for Fit">MMA</option>
									<option value="Trainer">Boxing</option>
									<option value="Amateur Fighter">Others</option>
								</select>
							</div>
							<div class="form-group">
								<select name="isPro" value={isPro} onChange={e => onChange(e)}>
									<option value={true}>Yes</option>
									<option value={false}> No </option>
								</select>
								<small className="form-text">Is the fight a pro fight?</small>
							</div>
							<div class="form-group">
								<select name="result" value={result} onChange={e => onChange(e)}>
									<option value={'Win by points'}>Win by points</option>
									<option value={'Win by KO/TKO'}>Win by KO/TKO</option>
									<option value={'Lose'}> Lose </option>
									<option value={'draw'}> draw </option>
								</select>
								<small className="form-text">Result of the fight</small>
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
