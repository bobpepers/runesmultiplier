import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import {
  withRouter,
  useHistory,
} from 'react-router-dom';
import {
  connect,
  useDispatch,
} from 'react-redux';
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
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import * as actions from '../actions/auth';

import {
  fetchPaymentMethodData,
} from '../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../actions/currencies';

import {
  tradeSecondStepAction,
  cancelTradeAction,
  secondTradeIdleAction,
  cancelTradeIdleAction,
  fetchSingleTradeData,
} from '../actions/trade';

const renderFieldTotal = ({
  input,
  type,
  placeholder,
  marking,
  meta: {
    touched,
    error,
  },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <InputLabel htmlFor="outlined-adornment-total">Total</InputLabel>
      <OutlinedInput
        id="outlined-adornment-total"
        label={placeholder}
        type={type}
        endAdornment={<InputAdornment position="end">{marking}</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': { marking },
          className: 'outlined-email-field',
        }}
        // labelWidth={0}
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const renderFieldAmount = ({
  input,
  type,
  placeholder,
  marking,
  meta: {
    touched,
    error,
  },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <InputLabel htmlFor="outlined-adornment-weight">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-weight"
        label={placeholder}
        type={type}
        endAdornment={<InputAdornment position="end">{marking}</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'amount',
          className: 'outlined-email-field',
        }}
        // labelWidth={0}
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
          // className="outlined-email-field"
        label={placeholder}
        type={type}
        variant="outlined"
        inputProps={{ className: 'outlined-email-field' }}
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const renderSelectField = ({
  input,
  label,
  name,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl
    variant="outlined"
    error={touched && error}
    style={{ width: '100%' }}
  >
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name,
        // id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
)

const TradeInit = (props) => {
  const {
    handleSubmit,
    paymentMethods,
    currencies,
    currentTrade,
    cancelTrade,
    values,
    user,
    price,
    match: {
      params: {
        id,
      },
    },
  } = props;
  const dispatch = useDispatch();
  console.log('RunesX Home View');
  useEffect(() => dispatch(fetchPaymentMethodData()), [dispatch]);
  useEffect(() => dispatch(fetchCurrenciesData()), [dispatch]);
  useEffect(() => dispatch(fetchSingleTradeData(id)), [dispatch]);

  useEffect(() => {}, [paymentMethods, currencies]);
  useEffect(() => {
    dispatch(secondTradeIdleAction());
  }, []);
  useEffect(() => {
    dispatch(cancelTradeIdleAction());
  }, []);

  const history = useHistory();

  useEffect(() => {
    console.log(currentTrade);
  }, [currentTrade, price]);

  useEffect(() => {
    if (cancelTrade.type === 'canceled') {
      history.push('/');
    }
  }, [cancelTrade]);

  useEffect(() => {
    if (currentTrade.type === 'requested') {
      console.log(currentTrade);
      history.push(`/trade/requested/${currentTrade.id}`);
    }
  }, [currentTrade]);

  useEffect(() => {
    console.log(currentTrade);
    if (currentTrade.type === 'requested') {
      console.log(currentTrade);
      history.push(`/trade/requested/${currentTrade.id}`);
    }
  }, [currentTrade]);

  const handleFormSubmit = async (obj) => {
    console.log(obj);
    await dispatch(tradeSecondStepAction(obj, id));
  }
  const cancelTradeFunc = async () => {
    // console.log(obj);
    await dispatch(cancelTradeAction(id));
  }

  const actualPrice = price
  && currentTrade
  && currentTrade.postAd
  && currentTrade.postAd.currency
    ? (price.filter((object) => object.currency === currentTrade.postAd.currency.iso))
    : 0;
  const marginPrice = actualPrice
  && actualPrice.length
  && currentTrade
  && currentTrade.postAd
    ? ((actualPrice[0].price / 100) * (currentTrade.postAd.margin / 1e2)).toFixed(8)
    : 0;

  if (currentTrade.type === 'init') {
    return (
      <div className="height100 content surfContainer">
        <Grid container>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container>
                <Grid item xs={12}>
                  <p>
                    Advertiser:
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.user.username}
                  </p>
                  <p>
                    Trader:
                    {' '}
                    {currentTrade
                    && currentTrade
                    && currentTrade.user
                    && currentTrade.user.username}
                  </p>
                  <p>
                    Ad type:
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.type}

                  </p>
                  <p>
                    Price Type:
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.priceType}
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.priceType === 'margin'
                    && '(Price sticks after this step. Verify price after trade start)'}
                  </p>
                  <p>
                    Price/RUNES:
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.priceType === 'static'
                    && (currentTrade.postAd.price / 1e8)}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.priceType === 'margin'
                    && actualPrice.length
                    && marginPrice}
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.currency.currency_name}
                  </p>
                  <p>
                    {user
                    && currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.type === 'buy'
                    && user.username === currentTrade.user.username
                    && `You want to sell to ${currentTrade.postAd.user.username}`}
                    {user
                    && currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.type === 'buy'
                    && user.username === currentTrade.postAd.user.username
                    && `${currentTrade.user.username} wants to sell to you`}
                    {user
                    && currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.type === 'sell'
                    && user.username === currentTrade.user.username
                    && `You want to buy from ${currentTrade.postAd.user.username}`}
                    {user
                    && currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.type === 'sell'
                    && user.username === currentTrade.postAd.user.username
                    && `${currentTrade.user.username} wants to buy from you`}
                  </p>
                  <p>
                    Min:
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.min / 1e8}
                    {' '}
                    RUNES
                  </p>
                  <p>
                    Max:
                    {' '}
                    {currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.max / 1e8}
                    {' '}
                    RUNES
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p>Amount (RUNES)</p>
                  <Field
                    name="amount"
                    component={renderFieldAmount}
                    type="number"
                    placeholder="Amount"
                    marking="RUNES"
                    onChange={(event, index, value) => {
                      console.log('nummer');
                      console.log(event.currentTarget.valueAsNumber);
                      console.log(currentTrade.price);
                      console.log('currentTrade');
                      console.log((event.currentTarget.valueAsNumber * (currentTrade.price / 1e8)));
                      // if (currentTrade.postAd) {
                      if (currentTrade.postAd && currentTrade.postAd.priceType === 'static') {
                        dispatch(change('postad', 'total', (event.currentTarget.valueAsNumber * (currentTrade.postAd.price / 1e8)).toFixed(8)));
                      }
                      if (currentTrade.postAd && currentTrade.postAd.priceType === 'margin') {
                        dispatch(change('postad', 'total', (event.currentTarget.valueAsNumber * (marginPrice)).toFixed(8)));
                      }

                      // }
                    }}
                  />
                  <p>
                    Total
                    {' '}
                    (
                    {
                      currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.currency
                        ? currentTrade.postAd.currency.iso
                        : ''
                    }
                    )

                  </p>
                  <Field
                    name="total"
                    component={renderFieldTotal}
                    type="number"
                    placeholder="Total"
                    marking={
                      currentTrade
                    && currentTrade.postAd
                    && currentTrade.postAd.currency
                        ? currentTrade.postAd.currency.iso
                        : ''
                    }
                    onChange={(event, index, value) => {
                      if (currentTrade.postAd && currentTrade.postAd.priceType === 'static') {
                        console.log('(event.currentTarget.valueAsNumber / (currentTrade.price / 1e8)).toFixed(8)');
                        console.log((event.currentTarget.valueAsNumber / (currentTrade.price / 1e8)).toFixed(8));
                        dispatch(change('postad', 'amount', (event.currentTarget.valueAsNumber / (currentTrade.postAd.price / 1e8)).toFixed(8)));
                      }
                      if (currentTrade.postAd && currentTrade.postAd.priceType === 'margin') {
                        dispatch(change('postad', 'amount', (event.currentTarget.valueAsNumber / (marginPrice)).toFixed(8)));
                      }
                      console.log('values');
                      console.log(values);
                      console.log(event.currentTarget.valueAsNumber);
                      console.log(value);
                      console.log(((event.currentTarget.valueAsNumber * 1e8) / (currentTrade.price)));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p>Respond Time</p>
                  <Field
                    name="repondTime"
                    component={renderSelectField}
                    label="Respond Time"
                    style={{ width: '100%' }}
                  >
                    <option value="" />
                    <option value="15">15 Min</option>
                    <option value="30">30 Min</option>
                    <option value="45">45 Min</option>
                    <option value="60">1 Hour</option>
                    <option value="120">2 Hour</option>
                    <option value="180">3 Hour</option>
                  </Field>
                </Grid>
                <Grid
                  item
                  style={{ marginBottom: '20px', marginTop: '20px' }}
                  xs={12}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                  >
                    Start Trade
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{ marginBottom: '20px' }}
                  xs={12}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    // type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                    onClick={() => cancelTradeFunc()}
                  >
                    Cancel Trade
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid item xs={12}>
          <h3>Trade Canceled</h3>
        </Grid>
      </Grid>
    </div>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.amount) {
    errors.amount = 'Amount is required'
  }
  if (!formProps.repondTime) {
    errors.repondTime = 'Respond Time is required'
  }
  return errors;
}

const selector = formValueSelector('postad');

const mapStateToProps = (state) => ({
  price: state.price.data,
  user: state.user.data,
  errorMessage: state.auth.error,
  paymentMethods: state.paymentMethods,
  currencies: state.currencies,
  currentTrade: state.currentTrade.data,
  cancelTrade: state.cancelTrade.data,
  values: selector(state, 'total', 'amount'),
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(reduxForm({ form: 'postad', validate })(TradeInit));
