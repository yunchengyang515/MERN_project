//React imports
import React, { useState, Fragment } from "react";
import GoogleMapReact from "google-map-react";
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
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
//styled component imports
import styled from "styled-components";

//Other components
import Comments from "./Comments"


//styled components
const AvatarWrap = styled(Avatar)`
  width: 50px;
  height: 50px;
`;
const CardWrap = styled(Card)`
  width: 80%;
`;
const ItemWrap = styled(Grid)`
  width: 50%;
  height: 200px;
  margin-bottom: 15px !important;
  margin-top:10px;
`;
const UserWrap = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;
const MapWrap = styled.div`
  height: 60vh;
  width: 50vw;
`;

const PostItem = ({ post }) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [mapOpen, setMapOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const mapCenter = post.location.geometry;

  const handleMapClickOpen = () => {
    setMapOpen(true);
  };

  const handleMapClose = () => {
    setMapOpen(false);
  };

  const handleCommentsClickOpen = () => {
    setCommentsOpen(true);
  };

  const handleCommentsClose = () => {
    setCommentsOpen(false);
  };

  const AnyReactComponent = () => (
    <div>
      <LocationOnIcon />
    </div>
  );
  const DisplayMap = () => {
    return (
      <div>
        <Dialog open={mapOpen} onClose={handleMapClose}>
          <MapWrap>
            <GoogleMapReact
              bootstrapURLKeys={{ key: apiKey }}
              defaultCenter={mapCenter}
              defaultZoom={11}
            >
              <AnyReactComponent lat={mapCenter.lat} lng={mapCenter.lng} />
            </GoogleMapReact>
          </MapWrap>
          <DialogActions>
            <Button onClick={handleMapClose}>
              <CloseIcon />
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const DisplayComments = () =>{
    return(
    <Dialog open={commentsOpen} onClose={handleCommentsClose}>
      <Comments comments={post.comments}/>
    </Dialog>
    )
  }

  const DisplayViewComments = ( comments ) =>{

    if (comments.length > 0){
      return(
        <Fragment>
        <Button size="small" color="primary" onClick={handleCommentsClickOpen}>
            View comments
          </Button>
          {DisplayComments()}
        </Fragment>
      )
    }
    return(
      <Typography>
        No comment yet
      </Typography>
    )
  }
  return (
    <ItemWrap item>
      <CardWrap>
        <CardActionArea>
          <UserWrap>
            <AvatarWrap alt={post.name} src={post.avatar} />
            <Typography variant="body1">{post.name}</Typography>
          </UserWrap>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body1">{post.description}</Typography>

            <Typography variant="body2">{post.location.address}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" onClick={handleMapClickOpen}>
            View Map Location
          </Button>
          {DisplayMap()}
          {DisplayViewComments(post.comments)}
        </CardActions>
      </CardWrap>
    </ItemWrap>
  );
};

export default PostItem;
