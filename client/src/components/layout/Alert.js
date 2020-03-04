import React from 'react';


import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from "styled-components"

const ComponentWrapper = styled.div`
margin-top:0;
width:100%;
`

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
      //return jsx for each alert
    <ComponentWrapper key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </ComponentWrapper>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);