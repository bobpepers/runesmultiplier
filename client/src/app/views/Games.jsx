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

import Activity from '../containers/Activity';
import Info from '../containers/Info';
import Volume from '../containers/Volume';
// import Globe from '../containers/Globe';
import {
  fetchCurrentTradeIdle,
  secondTradeIdleAction,
  cancelTradeIdleAction,
} from '../actions/trade';

const Home = () => {
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cancelTradeIdleAction());
  }, []);
  useEffect(() => {
    dispatch(fetchCurrentTradeIdle());
  }, []);
  useEffect(() => {
    dispatch(secondTradeIdleAction());
  }, []);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <p className="text-center">
            MiniLoto 100
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
        >
          <p className="text-center">
            MiniLoto 1000
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
        >
          <p className="text-center">
            Loto 100
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
        >
          <p className="text-center">
            Loto 1000
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withRouter(connect(mapStateToProps, actions)(Home));
