//React imports
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
//material ui imports
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Paper
} from "@material-ui/core";
//styled component imports
import styled from "styled-components"

//styled components
const AvatarWrap = styled(Avatar)`
width:50px;
height:50px
`
const CardWrap = styled(Card)`
width:80%;
`
const ItemWrap = styled(Grid)`
    width:50%;
    height:200px;
	margin-bottom: 15px;
`;
const UserWrap = styled.div`
margin:10px;
display:flex;
align-items:center;
margin-bottom:0px;
`
const MapWrap = styled(Paper)`
height:50vh;
width:40vw
`

const PostItem = ({ post }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [mapOpen, setMapOpen] = useState(false)
    const mapCenter = post.location.geometry 

    const handleClickOpen = () => {
        setMapOpen(true);
      };
    
      const handleClose = () => {
        setMapOpen(false);
      };

    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const DisplayMap =() =>{
        return(
        <div>
        <Dialog
          open={mapOpen}
          onClose={handleClose}
          
        >
           <MapWrap>

             <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey}}
          defaultCenter={mapCenter}
          defaultZoom={11}
        >
            <AnyReactComponent
            lat={mapCenter.lat}
            lng={mapCenter.lng}
            text="My Marker"
          />
 
      
        </GoogleMapReact>
        </MapWrap>
        </Dialog>
      </div>
        )
    }
  return (
      <ItemWrap item>
    <CardWrap>
        <CardActionArea>
            <UserWrap>
            <AvatarWrap alt ={post.name} src={post.avatar}/>
            <Typography  variant="body1" >
            {post.name}
          </Typography>
          </UserWrap>
            <CardContent>
          <Typography  variant="h5" >
            {post.title}
          </Typography>
          <Typography variant="body1">
            {post.description}
          </Typography>

          <Typography variant="body2">
            {post.location.address}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small" color="secondary" onClick ={handleClickOpen}>
          Map
        </Button>
        {DisplayMap()}
      </CardActions>
    </CardWrap>
    </ItemWrap>
  );
};

export default PostItem;
