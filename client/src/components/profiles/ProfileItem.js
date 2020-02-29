import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//material ui imports
import { Card, CardContent, CardMedia, Typography, Link, Button,Grid,Avatar} from '@material-ui/core';
import styled from 'styled-components';
import LocationOnIcon from '@material-ui/icons/LocationOn';

//global style components
const ItemWrap = styled(Grid)`
	width:50%;
	margin-bottom: 15px;
	height:300px;
`;
const CardWrapper = styled(Card)`
	display: flex;
	flex-direction: column;
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
	align-items: flex-start;
`;

const DetailWrap = styled.div`
	display: flex;
	flex-direction:column
	margin-top: 10px;
`;
const DetailRowWrap = styled.div`
	display: flex;
	margin-right: 10px;
	align-items: center;
	margin-bottom: 10px;
`;
const DetailItemWrap = styled.div`
	display: flex;
	margin-right: 10px;
`;
const AvatarWrap = styled(Avatar)`
	width: 60px !important ;
	height: 60px !important;
	border-radius: 200px !important;
	margin-right: 30px;
`;

const LinkWrapper = styled(Link)`
	margin: auto !important;
	color:#ff4d4d !important;
.MuiTypography-body1{
	font-size:1rem
	padding:0 !important
}

`;

const DotWrapper = styled.span`
	height: 8px;
	width: 8px;
	border-radius: 50%;
	display: inline-block;
	background-color: #ff4d4d;
	align-self: center;
	margin-right: 5px;
	margin-left: 8px;
`;
//main render function
const ProfileItem = ({ profile: { _id, user, status, fightexperience, experience, role, location } }) => {
	console.log(user.avatar)
	const DisplayDetail = () => {
		return (
			<DetailWrap>
				<DetailRowWrap>
					<DetailItemWrap>
						<LocationOnIcon />
						<Typography variant="h5">
							<span style={{ color: '#6699ff' }}>Location:</span> {location}
						</Typography>
					</DetailItemWrap>
				</DetailRowWrap>
				<DetailRowWrap>
					<DetailItemWrap>
						<DotWrapper></DotWrapper>{' '}
						<Typography variant="subtitle1" style={{ alignSelf: 'center' }}>
							{role}
						</Typography>
					</DetailItemWrap>
					{experience ? (
						<DetailItemWrap>
							<DotWrapper></DotWrapper>
							<Typography variant="subtitle1" style={{ alignSelf: 'center' }}>
								{' '}
								Trained for {experience} years
							</Typography>
						</DetailItemWrap>
					) : (
						<DetailItemWrap> </DetailItemWrap>
					)}
				</DetailRowWrap>
			</DetailWrap>
		);
	};
	const DisplayFightExperience = () => {
		var totalFight = 0;
		var proFight = 0;
		totalFight = fightexperience.length;
		proFight = fightexperience.filter(fight => fight.isPro === true).length;
		var text;
		if (totalFight > 0) {
			text = `Had ${totalFight} fight`;
		}
		if (totalFight > 1) {
			text = `Had ${totalFight} fights`;
		}

		return (
			<DetailRowWrap>
				<DetailItemWrap>
					<DotWrapper></DotWrapper>
					<Typography variant="subtitle1">{text}</Typography>
				</DetailItemWrap>
			</DetailRowWrap>
		);
	};
	///the main render return
	return (
		<ItemWrap item>
			<CardWrapper raised={true}>
				<CardContentWrapper>
					<DetailRowWrap>
						<AvatarWrap src={user.avatar} />
						<Typography variant="h4" style={{ color: '#343a40' }}>
							{user.name}
						</Typography>
					</DetailRowWrap>
					{DisplayDetail()}
					{fightexperience.length > 0 ? DisplayFightExperience() : null}
				</CardContentWrapper>
				<LinkWrapper href={'/profile/' + user._id} style={{ alignSelf: 'flex-end' }} variant="body1">
					View Profile
				</LinkWrapper>
			</CardWrapper>
		</ItemWrap>
	);
};

export default ProfileItem;
