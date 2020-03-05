//React and redux Import
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/post";
//Material ui imports
import { Container } from "@material-ui/core";

//Other components imports
import CreatedPost from "./CreatePost";
import PostItem from "./PostItem";
//Styled components imports
import styled from "styled-components";

//Styled components
export const ComponentWrap = styled(Container)`
  width: 100%;
  background-color: #f8f5f5;
  padding-bottom: 10px;
  position: relative;
  padding: 0px !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PostPage = ({ getAllPosts, posts }) => {
  //get the all post every render
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const [newPostAdded, setNewPostAdded] = useState(false)


  return (
    <div>
      <ComponentWrap>
        <CreatedPost />
        {posts.map(post => {
          return <PostItem post={post} />;
        })}
      </ComponentWrap>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.post.posts,
  user: state.auth.user
});

export default connect(mapStateToProps, { getAllPosts })(PostPage);
