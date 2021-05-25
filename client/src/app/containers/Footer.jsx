import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Tooltip,
  Select,
  FormControl,
} from '@material-ui/core';
import { withTranslation } from 'react-i18next';
// import actions from 'redux-form/lib/actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExposureIcon from '@material-ui/icons/Exposure';
import { fetchOnlineDataCount } from '../actions/online';
import { fetchUserData } from '../actions/user';

import { getPrice } from '../actions';
import { updateSelectedCurrency } from '../actions/selectCurrency';
import ThemeToggle from '../components/ThemeToggle';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Footer = (props) => {
  const {
    t,
    error,
    loading,
    price,
    user,
    online,
    location,
    selectedCurrency,
  } = props;

  const dispatch = useDispatch();
  const [onlineCount, setOnlineCount] = useState('');
  const classes = useStyles();
  const [currencyState, setCurrencyState] = useState('USD');
  // const [currencyData, setCurrencyData] = useState([{ id: 1, currency: 'USD', price: 0 }]);
  const handleChange = (event) => {
    // console.log(event.currentTarget.value)
    const { value } = event.currentTarget;
    setCurrencyState(value);
    dispatch(updateSelectedCurrency(price && price.filter((object) => object.currency === value)));
  };

  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  useEffect(() => dispatch(getPrice()), [dispatch]);
  useEffect(() => dispatch(fetchOnlineDataCount()), [dispatch]);

  useEffect(() => {
    console.log('update price and currencyState useffect')
    if (price) {
      console.log(currencyState);
      console.log(selectedCurrency);
    }
    if (price) {
      dispatch(updateSelectedCurrency(price.filter((object) => object.currency === currencyState)));
    }
  }, [price, currencyState]);

  useEffect(() => {
    console.log('location');
    console.log(location);
    if (location && location.currency) {
      console.log()
      setCurrencyState(location.currency.iso);
      dispatch(updateSelectedCurrency(price.filter((object) => object.currency === location.currency.iso)));
    }
  }, [location]);

  useEffect(() => {
    console.log('selectedCurrency');
    console.log(selectedCurrency);
  }, [price, user, currencyState, selectedCurrency, online]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="infoBar footer">
      <Grid
        container
        // className="height100 d-flex justify-content-around justify-content-md-center Grid itemst-unstyled categories ng-scope"
        // ng-controller="myController"
        direction="row"
        justify="center"
        alignItems="baseline"
      >
        <Grid
          item
          container
          justify="center"
          xs={6}
          sm={4}
          md={2}
        >
          <Tooltip title="People Online" aria-label="show">
            <p className="noBottomMargin floatLeft">
              <FiberManualRecordIcon />
              {' '}
              {online || 0}
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={6}
          sm={4}
          md={2}
        >
          <Tooltip title="Wallet total balance" aria-label="show">
            <p className="noBottomMargin floatLeft">
              <AccountBalanceWalletIcon />
              {' '}
              {
             user && user.wallet
               ? ((user.wallet.available + user.wallet.locked) / 1e8)
               : 0
            }
              {' '}
              RUNES
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={4}
          md={2}
          justify="center"
          // direction="column"
        >
          <Tooltip title="Estimated Wallet Value" aria-label="show">
            <p className="noBottomMargin">
              <ExposureIcon />
              {' '}
              ~
              {
             user && user.wallet && selectedCurrency.length
               ? (((user.wallet.available + user.wallet.locked) / 1e8) * selectedCurrency[0].price).toFixed(3)
               : 0
            }
              {' '}
              {currencyState}
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={4}
          md={2}
          justify="center"
          // direction="column"
        >
          <Tooltip title="Current RUNES price" aria-label="show">
            <p className="noBottomMargin">
              <LocalOfferIcon />
              {' '}
              {selectedCurrency.length && selectedCurrency[0].price}
              {' '}
              {currencyState}
            </p>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={6}
          sm={4}
          md={2}
        >
          <Tooltip title="Currency Selection" aria-label="show">
            <FormControl
              className={classes.formControl}
            >
              {/* <InputLabel htmlFor="age-native-simple">Currency</InputLabel> */}
              <Select
                native
                value={currencyState}
                onChange={handleChange}
                inputProps={{
                  name: 'currency',
                  id: 'age-native-simple',
                }}
              >
                {price && price.map((item) => <option value={item.currency}>{item.currency}</option>)}
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          md={2}
          align="center"
          // alignItems="center"
          // direction="row"
        >
          <ThemeToggle />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  price: state.price.data,
  online: state.online.people,
  location: state.location.data,
  selectedCurrency: state.selectedCurrency.data,
  // wallet: state.user.data.user,
  user: state.user.data,
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps)(withTranslation()(Footer));
