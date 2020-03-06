import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Paper,
  Divider,
  Avatar,
  Typography,
  TextField
} from "@material-ui/core";

import styled from "styled-components";

const CommentWrap = styled.div`
  display: flex;
  width:50vh;
  height:100%;
  align-items:center;
`;
const UserDetailWrap = styled.div`
  display: flex;
  align-items:center;
  margin-right:20px;
  flex-direction:column;
`;
const DisplayComment = (key, comment) => {
  return (
    <div id={key}>
      <CommentWrap>
        <UserDetailWrap>
          <Avatar alt={comment.name} src={comment.avatar} />
        </UserDetailWrap>
        <Typography variant="subtitle1">{comment.text}</Typography>
      </CommentWrap>
      <Divider />

    </div>
  );
};
const Comments = ({ comments }) => {
  return (
    <div>{comments.map((comment, key) => DisplayComment(key, comment))}</div>
  );
};

export default Comments;
