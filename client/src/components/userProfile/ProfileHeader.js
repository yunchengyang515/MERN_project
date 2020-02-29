//React import
import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
//Material ui import
import { Avatar, Grid, Typography, Button } from '@material-ui/core';

//Styled components
const ComponentWrap = styled.div`
height:100%`;
const CoverWrap = styled.div`
	height: 200px;
	width: 100%;
	border-bottom: solid 1px !important;
	position: relative;
`;
const ImgWrap = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: center;
`;
const ProfileImage = styled(Avatar)`
	width: 135px !important;
	height: 135px !important;
`;

const ProfileImageWrap = styled(Grid)`
	position: relative;
	width: 135px !important;
	height: 135px !important;
	margin-top: -80px;
	margin-left: 20px;
	@media screen and (max-width: 600px) {
		img {
			border-radius: 0 !important;
		}
	}

	img,
	.MuiAvatar-circle {
		width: 160px !important;
		height: 160px !important;
		border-radius: 160px;
		border: solid 2px;
		color: white;
	}
`;

const RowWrap = styled.div`
	display: flex;
`;
const NameRowWrap = styled.div`
	display: flex;
	margin-top: 20px;
	margin-left: 70px;
	align-items:center;
	width:65%;
`;
const IconWrap = styled.img`
	height: 40px;
	width: 40px;
	margin-right:15px;
`;
const BackButtonWrap = styled.div`
display:flex;
align-self:center;
margin-top:20px;
`
const BackButton = styled(Button)`
	height:40px;
	background-color:#FF6161 !important;
	color:white !important;
	align-self:flex-end;
`

const ProfileHeader = prop => {
	const history = useHistory();
	const RenderCover = () => {
		const url = process.env.PUBLIC_URL + '/cover.jpg';

		return (
			<CoverWrap>
				<ImgWrap src={url} />
			</CoverWrap>
		);
	};

	const RenderDetail = () => {
		const IconUrl = process.env.PUBLIC_URL + '/gloves.png';
		return (
			<RowWrap>
				<ProfileImageWrap>
					<ProfileImage src={prop.user.avatar} />
				</ProfileImageWrap>
				<NameRowWrap>
				<IconWrap src={IconUrl} />
				<Typography variant="h3">
					{prop.user.name}
				</Typography>
				</NameRowWrap>
				<BackButtonWrap>
				<BackButton variant ="filled" onClick={()=>{history.push("/profiles")}}>
					Back to Profiles
				</BackButton>
				</BackButtonWrap>
			</RowWrap>
		);
	};
	return (
		<ComponentWrap>
			{RenderCover()}
			{RenderDetail()}
		</ComponentWrap>
	);
};

export default ProfileHeader;
