//React import
import React, { useState, useEffect, Fragment } from "react";

//Material ui import
import { Paper, Typography } from "@material-ui/core";
//styled component import
import styled from "styled-components";
//Icons import
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DateRangeIcon from "@material-ui/icons/DateRange";

//styled components
const ComponentWrap = styled(Paper)`
  background-color: white;
  width: 73%;
  margin-left: 220px;
  margin-top:20px
  display: flex;
  padding:15px;
`;
const DetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;
const TitleWrap = styled.div`
  display: flex;
  color: #515baf;
  margin-left: 5px;
`;
const RowWrap = styled.div`
  display: flex;
`;
const RowItemWrap = styled.div`
  display: flex;
  margin-left: 50px;
  margin-top: 10px;
`;
const FieldNameWrap = styled(Typography)`
  color: #515baf;
  margin-right: 10px !important;
`;

const DotWrapper = styled.span`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  background-color: #ff4d4d;
  align-self: center;
  margin-right: 5px;
  margin-left: 8px;
`;

const ValueWrap = styled(Typography)``;

const StylesWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  algin-items: flex-end;
  justify-content:center;
  margin-top:15px;
`;
const StyleWrap = styled.div`
  display: flex;
`;

const InfoSection = profile => {
  //Hooks
  const [details, setDetails] = useState({});

  useEffect(() => {
    setDetails(profile.profile);
  }, [profile]);

  const DisplayRowItem = (field, value, Icon) => {
    return (
      <RowItemWrap>
        <Icon />
        <FieldNameWrap variant="h5">{field}</FieldNameWrap>
        <ValueWrap variant="h5">{value}</ValueWrap>
      </RowItemWrap>
    );
  };
  const DisplayStyle = style => {
    return (
      <StyleWrap>
        <DotWrapper /> {style}
      </StyleWrap>
    );
  };
  //Main render
  if (profile) {
    console.log(details);
    let experienceString = `Trained for ${details.experience} years`;
    if (details.experience >= 4) {
      experienceString = `Trained for more than ${details.experience} years`;
    }
    return (
      <ComponentWrap>
        <DetailsWrap>
          <TitleWrap>
            <Typography variant="h6">Details:</Typography>
          </TitleWrap>
          <RowWrap>
            {DisplayRowItem("Location:", details.location, LocationOnIcon)}
            {DisplayRowItem("Goal:", details.role, DoneAllIcon)}
          </RowWrap>
          <RowWrap>
            {DisplayRowItem("Experience:", experienceString, DateRangeIcon)}
          </RowWrap>
        </DetailsWrap>
        <StylesWrap>
          {details.styles
            ? details.styles.map(style => DisplayStyle(style))
            : null}
        </StylesWrap>
      </ComponentWrap>
    );
  }
  return null;
};

export default InfoSection;
