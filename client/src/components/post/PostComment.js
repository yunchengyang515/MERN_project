import React, { useState } from "react";

import { TextField, Button } from "@material-ui/core";

import { connect } from 'react-redux';
import { postComment } from "../../actions/post"
import styled from "styled-components";

const ComponentWrap = styled.div`
  margin-left: 5px;
  display: flex;
`;
const PostComment = ({ postComment, id }) => {


  const handleSubmit = () => {
      let newComment ={
          text: comment
      }
      postComment(newComment, id)
  };
  const handleOnChange = (event) =>{
      let value = event.target.value
      if(value.length >3){
          setValid(true);
          setComment(value)
      }
  }


  return (
    <ComponentWrap>
      <TextField label="Post a comment" fullWidth onChange={handleOnChange}/>
      <Button disabled={!valid} onClick={handleSubmit}>Post</Button>
    </ComponentWrap>
  );
};
const mapStateToProps = state => ({
	
});

export default connect(mapStateToProps, { postComment})(PostComment);
