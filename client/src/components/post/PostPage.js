import React from 'react'
import CreatedPost from "./CreatePost"
import styled from "styled-components"
import { Container } from "@material-ui/core"

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

export default() => {
    return (
        <div>
            <ComponentWrap>
            <CreatedPost/>
            </ComponentWrap>
        </div>
    )
}

