import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Link, Button } from '@material-ui/core';
import styled from 'styled-components';

const ItemWrap = styled.div`
	margin-bottom: 15px;
`;
const CardWrapper = styled(Card)`
	display: flex;
	width: 80%;
	margin: auto;
	@media only screen and (max-width: 600px) {
		width: 90%;
	}
`;

const CardContentWrapper = styled(CardContent)`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-left: 5%;
`;

const DetailWrap = styled.div`
	display: flex;
	margin-top: 10px;
	@media only screen and (max-width: 1100px) {
		flex-direction: column;
	}
`;
const DetailTextWrap = styled.div`
	display: flex;
	margin-right: 5px;
	width: 33.3%;
	@media only screen and (max-width: 1100px) {
		width: 80%;
	}
`;
const CardMediaWrap = styled(CardMedia)`
	width: auto !important ;
	height: 60px !important;
	border-radius: 200px !important;
	margin: 5px;
`;

const LinkWrapper = styled(Link)`
	width:25%;
	margin: auto !important;
	color:#ff4d4d !important;
.MuiTypography-body1{
	font-size:1rem
	padding:0 !important
}

`;
const ProfileItem = ({ profile: { _id, user, status, fightexperience, experience, role, location } }) => {
	const DisplayDetail = () => {
		return (
			<DetailWrap>
				<DetailTextWrap>
					<Typography variant="body1">
						<span style={{ color: '#6699ff' }}>Location:</span> {location}
					</Typography>
				</DetailTextWrap>
				<DetailTextWrap>
					<Typography variant="body1">
						{' '}
						<span style={{ color: '#6699ff' }}>Purpose:</span> {role}
					</Typography>
				</DetailTextWrap>

				{experience ? (
					<DetailTextWrap>
						<Typography variant="body2" style={{ alignSelf: 'center' }}>
							{' '}
							Trained for {experience} years
						</Typography>
					</DetailTextWrap>
				) : (
					<DetailTextWrap> </DetailTextWrap>
				)}
			</DetailWrap>
		);
	};
	const DisplayFightExperience = () => {
		var totalFight = 0;
		var proFight = 0;
		totalFight = fightexperience.length;
		proFight = fightexperience.filter(fight => fight.isPro === true).length;

		if (totalFight > 1) {
			return (
				<DetailWrap>
					<Typography variant="body1">
						{' '}
						Had {totalFight} fights
						{proFight > 0 ? <span variant="body1"> : With {totalFight} pro fights</span> : null}
					</Typography>
				</DetailWrap>
			);
		}
		if (totalFight > 0) {
			return (
				<DetailWrap>
					<Typography variant="body1">
						{' '}
						Had {totalFight} fight
						{proFight > 0 ? <span variant="body1"> : With {totalFight} pro fights</span> : null}
					</Typography>
				</DetailWrap>
			);
		}
	};
	return (
		<ItemWrap>
			<CardWrapper raised={true}>
				<CardMediaWrap component="img" image={user.avatar} />
				<CardContentWrapper>
					<Typography variant="h5" style={{ color: '#343a40' }}>
						{user.name}
					</Typography>
					{DisplayDetail()}
					{DisplayFightExperience()}
				</CardContentWrapper>
				<LinkWrapper 
				href={"/profile/"+user._id}
				style={{ alignSelf: 'flex-end' }} variant="body1">
					View Profile
				</LinkWrapper>
			</CardWrapper>
		</ItemWrap>
	);
};

export default ProfileItem;
