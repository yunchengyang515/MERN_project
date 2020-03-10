import React, { useState } from "react";

import { Divider, Avatar, Typography, TextField, Button } from "@material-ui/core";

import styled from "styled-components";

import { connect } from "react-redux";
import { postComment } from "../../actions/post";

const CommentWrap = styled.div`
  display: flex;
  width: 50vh;
  height: 100%;
  align-items: center;
`;
const UserDetailWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  flex-direction: column;
`;

const PostCommentWrap = styled.div`
  margin-left: 5px;
  display: flex;
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
const Comments = ({ comments, id, postComment }) => {
  const [postComments, setComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [valid, setValid] = useState(false);

  const DisplayPostComment = () => {
    const handleSubmit = () => {
      let newComment = {
        text: newComment
      };
      postComment(newComment, id);
    };
    const handleOnChange = event => {
      let value = event.target.value;
      if (value.length > 3) {
        setValid(true);
        setNewComment(value);
      }
    };

    return (
      <PostCommentWrap>
        <TextField label="Post a comment" fullWidth onChange={handleOnChange} />
        <Button disabled={!valid} onClick={handleSubmit}>
          Post
        </Button>
      </PostCommentWrap>
    );
  };

  return (
    <div>
      {postComments.map((comment, key) => DisplayComment(key, comment))}
      {DisplayPostComment()}
    </div>
  );
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { postComment })(Comments);
