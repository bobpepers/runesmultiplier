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
import * as actions from '../../actions/auth';

import {
  fetchPaymentMethodData,
} from '../../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../../actions/currencies';

import {
  sendMessageAction,
} from '../../actions/message';

import {
  fetchAdminSingleTradeData,
} from '../../actions/admin';

import {
  cancelMainTradeAction,
  acceptMainTradeAction,
} from '../../actions/trade';

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

const Trade = (props) => {
  const {
    adminSingleTrade,
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
  useEffect(() => dispatch(fetchAdminSingleTradeData(id)), [dispatch]);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const onBasicFieldChange = (event, newValue, previousValue, name) => {
    setDescriptionLength(newValue.length);
  };

  const handleFormSubmit = async (message) => {
    await dispatch(sendMessageAction(message, adminSingleTrade.id));
  }

  const cancelTrade = async () => {
    // console.log(obj);
    await dispatch(cancelMainTradeAction(id));
  }

  const acceptTrade = async () => {
    // console.log(obj);
    await dispatch(acceptMainTradeAction(id));
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid container item xs={12}>
          <h3>
            Ad #
            {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.id}
            {' '}
            | Trade #
            {adminSingleTrade && adminSingleTrade.id}
          </h3>
        </Grid>
        <Grid container item xs={12}>
          <p>
            advertisment #
            {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.id}
            {' '}
            by
            {' '}
            {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.user && adminSingleTrade.postAd.user.username }
            {' '}
            at the exchange rate
            {' '}
            {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.price / 1e8}
            {' '}
            {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.currency.currency_name}
            /RUNES
          </p>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid container item xs={12}>
            <div className="container">
              <div className="chat-container">
                {adminSingleTrade && adminSingleTrade.messages ? adminSingleTrade.messages.map((item, index) => (
                  <div className="message">
                    <img className="avatar" src="/uploads/avatars/avatar.png" />
                    <div className="datetime">{item.createdAt}</div>
                    <p>
                      {item.user.username}
                      :
                    </p>
                    <p>
                      {item.message}
                    </p>
                  </div>
                )) : ''}
              </div>
            </div>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs={12} />
            <Grid item xs={12}>
              <h3>Send message to </h3>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid item>
                  <Field
                    name="message"
                    component={renderTextField}
                    type="message"
                    placeholder="Message"
                    onChange={onBasicFieldChange}
                  />
                  <div>
                    {descriptionLength}
                    {' '}
                    / 400
                  </div>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit" className="btn" fullWidth size="large">
                    Send
                  </Button>
                </Grid>
              </form>
            </Grid>

          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <p>
                  {adminSingleTrade
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.user
                    && adminSingleTrade.postAd.user.username}
                  :
                  {' '}
                  {adminSingleTrade
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.userOneComplete === false
                    && (<span style={{ color: 'blue' }}>Waiting for Action</span>)}
                  {adminSingleTrade
                    && adminSingleTrade.userOneCancel === true
                    && adminSingleTrade.userOneComplete === false
                    && (<span style={{ color: 'red' }}>Wants to cancel this trade</span>)}
                  {adminSingleTrade
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.userOneComplete === true
                    && (<span style={{ color: 'green' }}>Wants to complete this trade</span>)}
                </p>
                <p>
                  {adminSingleTrade && adminSingleTrade.user && adminSingleTrade.user.username}
                  :
                  {' '}
                  {adminSingleTrade
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.userTwoComplete === false
                    && (<span style={{ color: 'blue' }}>Waiting for Action</span>)}
                  {adminSingleTrade
                    && adminSingleTrade.userTwoCancel === true
                    && adminSingleTrade.userTwoComplete === false
                    && (<span style={{ color: 'red' }}>Wants to cancel this trade</span>)}
                  {adminSingleTrade
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.userTwoComplete === true
                    && (<span style={{ color: 'green' }}>Wants to complete this trade</span>)}
                </p>
              </Grid>
              <Grid item xs={12}>
                {adminSingleTrade
            && adminSingleTrade.postAd
            && adminSingleTrade.postAd.type === 'sell'
            && adminSingleTrade.postAd.user
            && user
            && user.username === adminSingleTrade.user.username
            && (
            <p className="text-center">
              You want to buy
              {' '}
              {adminSingleTrade.amount / 1e8}
              {' '}
              RUNES from
              {' '}
              {adminSingleTrade.postAd.user.username}
              {' '}
              for
              {' '}
              {((adminSingleTrade.amount / 1e8) * (adminSingleTrade.price / 1e8))}
              {' '}
              {adminSingleTrade.postAd.currency.currency_name}
            </p>
            )}
                {adminSingleTrade
            && adminSingleTrade.postAd
            && adminSingleTrade.postAd.type === 'sell'
            && adminSingleTrade.postAd.user
            && user
            && user.username === adminSingleTrade.postAd.user.username
            && (
            <p className="text-center">
              {adminSingleTrade.user.username}
              {' '}
              wants to buy
              {' '}
              {adminSingleTrade.amount / 1e8}
              {' '}
              RUNES from you for
              {' '}
              {((adminSingleTrade.amount / 1e8) * (adminSingleTrade.price / 1e8))}
              {' '}
              {adminSingleTrade.postAd.currency.currency_name}
            </p>
            )}
                {adminSingleTrade
            && adminSingleTrade.postAd
            && adminSingleTrade.postAd.type === 'buy'
            && adminSingleTrade.postAd.user
            && user
            && user.username === adminSingleTrade.user.username
            && (
            <p className="text-center">
              You want to sell
              {' '}
              {adminSingleTrade.amount / 1e8}
              {' '}
              RUNES to
              {' '}
              {adminSingleTrade.postAd.user.username}
              {' '}
              for
              {' '}
              {((adminSingleTrade.amount / 1e8) * (adminSingleTrade.price / 1e8))}
              {' '}
              {adminSingleTrade.postAd.currency.currency_name}
            </p>
            )}
                {adminSingleTrade
            && adminSingleTrade.postAd
            && adminSingleTrade.postAd.type === 'buy'
            && adminSingleTrade.postAd.user
            && user
            && user.username === adminSingleTrade.postAd.user.username
            && (
            <p className="text-center">
              {adminSingleTrade.user.username}
              {' '}
              wants to sell
              {' '}
              {adminSingleTrade.amount / 1e8}
              {' '}
              RUNES to you for
              {' '}
              {((adminSingleTrade.amount / 1e8) * (adminSingleTrade.price / 1e8))}
              {' '}
              {adminSingleTrade.postAd.currency.currency_name}
            </p>
            )}
              </Grid>
              <Grid item xs={12}>

                {// Buy
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'sell'
                    && adminSingleTrade.userOneComplete === false
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.postAd.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      i have received payment
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'sell'
                    && adminSingleTrade.userOneComplete === true
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.postAd.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      Undo
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'sell'
                    && adminSingleTrade.userTwoComplete === false
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      i have sent payment
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'sell'
                    && adminSingleTrade.userTwoComplete === true
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      Undo
                    </Button>
                    )
                    }
                {// Sell
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userOneComplete === false
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.postAd.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      i have sent payment
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userOneComplete === true
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.postAd.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      Undo sent payment
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userTwoComplete === false
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      i have received payment
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userTwoComplete === true
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => acceptTrade()}
                    >
                      Undo received payment
                    </Button>
                    )
                    }
              </Grid>

              <Grid item xs={12}>
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    // && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userTwoComplete === false
                    && adminSingleTrade.userTwoCancel === false
                    && adminSingleTrade.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => cancelTrade()}
                    >
                      Request Cancel Trade
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    // && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userTwoComplete === false
                    && adminSingleTrade.userTwoCancel === true
                    && adminSingleTrade.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => cancelTrade()}
                    >
                      Undo Cancel Trade
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.user
                    // && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userOneComplete === false
                    && adminSingleTrade.userOneCancel === false
                    && adminSingleTrade.postAd.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => cancelTrade()}
                    >
                      Request Cancel Trade
                    </Button>
                    )
                    }
                {
                    adminSingleTrade
                    && user
                    && adminSingleTrade.postAd
                    && adminSingleTrade.postAd.user
                    // && adminSingleTrade.postAd.type === 'buy'
                    && adminSingleTrade.userOneComplete === false
                    && adminSingleTrade.userOneCancel === true
                    && adminSingleTrade.postAd.user.username === user.username
                    && (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => cancelTrade()}
                    >
                      Undo Cancel Trade
                    </Button>
                    )
                    }
              </Grid>
            </Grid>
            {
                adminSingleTrade
                && adminSingleTrade.postAd
                && adminSingleTrade.postAd.paymentDetails
                && (
                <Grid container item xs={12}>
                  <Grid container item xs={12}>
                    <h3>Payment Details</h3>
                  </Grid>
                  <Grid container item xs={12}>
                    {adminSingleTrade.postAd.paymentDetails}
                  </Grid>
                </Grid>
                )
              }

            <Grid container item xs={12}>
              <Grid container item xs={12}>
                <h3>Detailed info</h3>
              </Grid>
              <Grid container item xs={6}>
                Trader
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.user && adminSingleTrade.user.username }
              </Grid>
              <Grid container item xs={6}>
                Advertiser
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.user && adminSingleTrade.postAd.user.username }
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.type}
              </Grid>
              <Grid container item xs={6}>
                Deal amount
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.amount / 1e8}
              </Grid>
              <Grid container item xs={6}>
                price
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.price / 1e8}
              </Grid>
              <Grid container item xs={6}>
                total
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.postAd && ((adminSingleTrade.amount / 1e8) * (adminSingleTrade.price / 1e8))}
              </Grid>
              <Grid container item xs={6}>
                Currency
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade && adminSingleTrade.postAd && adminSingleTrade.postAd.currency.currency_name}
              </Grid>
              <Grid container item xs={6}>
                Payment Method
              </Grid>
              <Grid container item xs={6}>
                {adminSingleTrade
                && adminSingleTrade.postAd
                && adminSingleTrade.postAd.paymentMethod
                && (
                <span>
                  {adminSingleTrade.postAd.paymentMethod.description}
                  {' '}
                  (
                  {adminSingleTrade.postAd.paymentMethod.name}
                  )
                </span>
                )}
              </Grid>
              <Grid container item xs={6}>
                Transaction status
              </Grid>
              <Grid container item xs={6}>
                running
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  user: state.user.data,
  adminSingleTrade: state.adminSingleTrade.data,
  // adminSingleTrade: state.adminSingleTrade.data,
});

const validate = (formProps) => {
  const errors = {};
  if (!formProps.message) {
    errors.message = 'Message is required'
  }

  return errors;
}

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
// export default connect(mapStateToProps, actions)(TradeRequested);
export default connect(mapStateToProps, actions)(reduxForm({ form: 'message', validate })(Trade));
