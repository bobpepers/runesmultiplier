import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
} from '@material-ui/core';
import Countdown from 'react-countdown';
import Card from '@material-ui/core/Card';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import CloseIcon from '@material-ui/icons/Close';
import * as actions from '../actions/auth';

import {
  fetchPaymentMethodData,
} from '../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../actions/currencies';

import {
  sendMessageAction,
} from '../actions/message';

import {
  cancelMainTradeAction,
  acceptMainTradeAction,
  fetchSingleTradeData,
} from '../actions/trade';

const renderTextField = ({
  input,
  type,
  placeholder,
  meta: {
    touched,
    error,
  },
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <TextField
          // id="outlined-multiline-static"
      label="Message"
      multiline
      style={{ width: '100%' }}
      rows={6}
      defaultValue=""
      inputProps={{
        maxLength: 400,
        // className: 'outlined-adornment-field',
      }}
      variant="outlined"
      {...input}
    />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

const TradeCanceled = (props) => {
  const {
    currentTrade,
    handleSubmit,
    user,
    match: {
      params: {
        id,
      },
    },
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('RunesX Home View');
  useEffect(() => dispatch(fetchSingleTradeData(id)), [dispatch]);
  const [descriptionLength, setDescriptionLength] = useState(0);

  useEffect(() => {
    console.log(currentTrade);
    if (currentTrade.userOneComplete === true && currentTrade.userTwoComplete === true) {
      console.log(currentTrade);
      history.push(`/trade/complete/${currentTrade.id}`);
    }
  }, [currentTrade]);

  useEffect(() => {
    if (currentTrade.type === 'accepted') {
      console.log(currentTrade);
      history.push(`/trade/${currentTrade.id}`);
    }
  }, [currentTrade]);

  return (
    <div className="height100 content surfContainer">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <h3 className="text-center">
            Trade #
            {currentTrade.id}
            {' '}
            Canceled
          </h3>
        </Grid>
        <Grid item xs={4}>
          <CloseIcon
            style={{
              width: '100%',
              height: '100%',
              color: 'red',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <p className="text-center">
            {currentTrade
            && currentTrade.user
            && currentTrade.user.username === user.username
            && `Trade with ${currentTrade.postAd.user.username} for ${currentTrade.amount / 1e8} RUNES was canceled`}
            {currentTrade
            && currentTrade.postAd
            && currentTrade.postAd.user
            && currentTrade.postAd.user.username === user.username
            && `Trade with ${currentTrade.user.username} for ${currentTrade.amount / 1e8} RUNES was canceled`}
          </p>
          <p className="text-center">
            Price:
            {' '}
            {currentTrade
            && currentTrade.price / 1e8}
            {' '}
            {currentTrade
            && currentTrade.postAd
            && currentTrade.postAd.currency
            && currentTrade.postAd.currency.currency_name}
          </p>
        </Grid>

      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  user: state.user.data,
  currentTrade: state.currentTrade.data,
});

const validate = (formProps) => {
  const errors = {};
  if (!formProps.message) {
    errors.message = 'Message is required'
  }

  return errors;
}

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(TradeCanceled);
// export default connect(mapStateToProps, actions)(reduxForm({ form: 'message', validate })(Trade));
