import React from 'react';
import spinner from './spinner.gif';
import styled from "styled-components";

const ComponentWrapper=styled.section`
position: relative;
margin-top:300px;
background:none;
`
export default () => (
   
  <ComponentWrapper>
    <img
      src={spinner}
      style={{width:"auto",height:"30%", margin:"auto", display:"block", background:"black"}}
      alt='Loading...'
    />
  </ComponentWrapper>
);