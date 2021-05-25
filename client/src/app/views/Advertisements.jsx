import React, {
  useEffect,
  // useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';

import {
  fetchMyPostAdData,
} from '../actions/postAd';
// import Info from '../containers/Info';
// import * as actions from '../actions/auth';
import TableMyAds from '../components/TableMyAds';

const headers = [
  'Seller',
  'Payment Method',
  'Price / RUNES',
  'Limits',
  'Actions',
];

const headCells = [
  {
    id: 'type', numeric: false, disablePadding: true, label: 'Type',
  },
  {
    id: 'country', numeric: true, disablePadding: false, label: 'Country',
  },
  {
    id: 'paymentMethod', numeric: true, disablePadding: false, label: 'Payment Method',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Price / RUNES',
  },
  {
    id: 'currency', numeric: true, disablePadding: false, label: 'Currency',
  },
  {
    id: 'actual', numeric: true, disablePadding: false, label: 'Margin %',
  },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const Dashboard = (props) => {
  const {
    myAds,
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchMyPostAdData()), [dispatch]);
  useEffect(() => {
    console.log('6666666666666666');
    console.log(myAds);
  }, [myAds]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Your Advertisements</h3>
          <TableMyAds
            headCells={headCells || []}
            postAd={myAds || []}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  myAds: state.myAds.data,
  // errorMessage: state.auth.error,
})

export default withRouter(connect(mapStateToProps, null)(Dashboard));
