import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import styled from "styled-components";
import { deleteExperience } from "../../actions/profile";

const ComponentWrapper = styled.div`
  margin-top: 10px;
  width:100%;
`;
const ContainerWrapper = styled(TableContainer)`
  min-width: 90% !important;
`;
const TableWrapper = styled(Table)`
  width: 80%;
  font-size: 20px;
`;
const TextWrapper = styled(Typography)`
  margin-top: 2.5rem !important;
  margin-bottom: 1.5rem !important;
  color: #343a40;
`;
const ButtonWrapper = styled(Button)`
  background-color: #ff004c !important;
  color: white !important;
`;
const Experience = ({ fightexperience, deleteExperience, editable }) => {
  const DisplayExperience = fightexperience
    .filter(exp => exp.discipline != undefined)
    .map(exp => (
      <TableRow>
        <TableCell>
          <Typography>{exp.promotion ? exp.promotion : "--"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{exp.discipline}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{exp.isPro ? "Pro" : "Amateur"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{exp.result}</Typography>
        </TableCell>
        {editable ? (
          <TableCell>
            <ButtonWrapper onClick={() => deleteExperience(exp._id)}>
              <Typography variant="button">Delete</Typography>
            </ButtonWrapper>
          </TableCell>
        ) : null}
      </TableRow>
    ));
  return (
    <ComponentWrapper>
      <TextWrapper variant="h5"> Fight Experience </TextWrapper>
      <ContainerWrapper component={Paper}>
        <TableWrapper>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Promotion</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Discipline</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Pro/Amateur</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Result</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{DisplayExperience}</TableBody>
        </TableWrapper>
      </ContainerWrapper>
    </ComponentWrapper>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
