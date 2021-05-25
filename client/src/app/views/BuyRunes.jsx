import React, {
  useEffect,
  useState,
  useLayoutEffect,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  fetchPostAdData,
} from '../actions/postAd';
import {
  fetchPaymentMethodData,
} from '../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../actions/currencies';

import {
  fetchCountriesData,
} from '../actions/countries';
// import Info from '../containers/Info';
// import * as actions from '../actions/auth';
import TableAds from '../components/TableAds';

const headers = [
  'Seller',
  'Payment Method',
  'Price / RUNES',
  'Limits',
  'Actions',
];

const headCells = [
  {
    id: 'seller', numeric: false, disablePadding: true, label: 'Seller',
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
  // {
  //  id: 'actual', numeric: true, disablePadding: false, label: 'Over/Under Price %',
  // },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BuyRunes = (props) => {
  const {
    postAd,
    paymentMethods,
    currencies,
    countries,
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [country, setCountry] = useState('all');
  const [currency, setCurrency] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [userStatus, setUserStatus] = useState('all');
  const [storeStatus, setStoreStatus] = useState('all');

  useEffect(() => dispatch(fetchPaymentMethodData()), [dispatch]);
  useEffect(() => dispatch(fetchCurrenciesData()), [dispatch]);
  useEffect(() => dispatch(fetchCountriesData()), [dispatch]);
  useEffect(() => dispatch(fetchPostAdData('sell', country, paymentMethod, currency, userStatus, storeStatus, 'all')), [dispatch]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeUserStatus = (event) => {
    setUserStatus(event.target.value);
  };

  const handleChangeStoreStatus = (event) => {
    setStoreStatus(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchPostAdData('sell', country, paymentMethod, currency, userStatus, storeStatus, 'all'));
  }, [country, paymentMethod, currency, userStatus, storeStatus]);

  useEffect(() => {}, [postAd]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Buy Runes Online</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">User Status</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userStatus}
                onChange={handleChangeUserStatus}
                label="User Status"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="online">
                  Online
                </MenuItem>
                <MenuItem value="offline">
                  Offline
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Store Status</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={storeStatus}
                onChange={handleChangeStoreStatus}
                label="Store Status"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="open">
                  Open
                </MenuItem>
                <MenuItem value="closed">
                  Closed
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid container item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={country}
                onChange={handleChangeCountry}
                label="Country"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                {countries
                && countries.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Payment Method</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={paymentMethod}
                onChange={handleChangePaymentMethod}
                label="Payment Method"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                {paymentMethods
                && paymentMethods.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currency}
                onChange={handleChangeCurrency}
                label="Currency"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                {currencies
                && currencies.map((item) => <MenuItem value={item.id}>{item.currency_name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
                  postAd && postAd.isFetching
                    ? (<CircularProgress />)
                    : (
                      <TableAds
                        defaultPageSize={10}
                        headCells={headCells || []}
                        postAd={postAd && postAd.sell ? postAd.sell : []}
                      />
                    )
                }

        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  postAd: state.postAd,
  paymentMethods: state.paymentMethods.data,
  currencies: state.currencies.data,
  countries: state.countries.data,
  // errorMessage: state.auth.error,
})

export default withRouter(connect(mapStateToProps, null)(BuyRunes));
