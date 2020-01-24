import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Link } from '@material-ui/core';
import styled from 'styled-components';

const ItemWrap = styled.div`
margin-bottom:10px;

`
const CardWrapper = styled(Card)`
	display: flex;
	width: 60%;
    margin: auto;
    @media only screen and (max-width: 600px) {
        width:90%;
    }

`;

const CardContentWrapper = styled(CardContent)`
	display: flex;
	flex-direction: column;
    width: 100%;
    margin-left:5%;
`;

const DetailWrap = styled.div`
	display: flex;
    width: 100%;
    margin-top:10px;
    overflow:scroll;
`;
const DetailTextWrap = styled.div`
	display: flex;
	width: 33%;
`;
const CardMediaWrap = styled(CardMedia)`
width:auto !important ;
height:60px !important;
border-radius:100px !important;
overflow:hidden;
margin:5px;
`
const ProfileItem = ({ profile: { user, status, fightexperience, experience, role, location } }) => {
	console.log(user);
	const DisplayDetail = () => {
		return (
			<DetailWrap>
				<DetailTextWrap>
					<Typography variant = "body1"><span style ={{color: "#6699ff"}}>Location:</span> {location}</Typography>
				</DetailTextWrap>
				<DetailTextWrap>
					<Typography variant = "body1"> <span style ={{color: "#6699ff"}}>Purpose:</span> {role}</Typography>
				</DetailTextWrap>

				{experience ? (
					<DetailTextWrap>
						<Typography variant = "body1"> Trained for {experience} years</Typography>
					</DetailTextWrap>
				) : <DetailTextWrap> </DetailTextWrap>}
			</DetailWrap>
		);
	};
	return (
		<ItemWrap>
			<Link>
				<CardWrapper raised = {true}>
                    <CardMediaWrap component="img" image = {user.avatar}/>
					<CardContentWrapper>
                        <Typography variant = "h5" style ={{color:"#343a40"}}>{user.name}</Typography>
                        {DisplayDetail()}</CardContentWrapper>
				</CardWrapper>
			</Link>
		</ItemWrap>
	);
};

export default ProfileItem;
