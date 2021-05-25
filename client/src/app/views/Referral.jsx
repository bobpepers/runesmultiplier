import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';
import * as actions from '../actions/auth';

import Referrals from '../containers/Referrals';
// import Globe from '../containers/Globe';

const Referral = (props) => {
  const {
    user,
  } = props;
  console.log('RunesX Home View');

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
      >
        <Referrals
          user={user || []}
        />
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  user: state.user.data,
})

export default withRouter(connect(mapStateToProps, actions)(Referral));
