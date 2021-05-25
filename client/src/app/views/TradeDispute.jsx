import React, {
  useEffect,
  useState,
  useRef,
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
import * as actions from '../actions/auth';

import {
  fetchPaymentMethodData,
} from '../actions/paymentMethods';

import {
  adminCompleteDisputeAction,
} from '../actions/admin';

import {
  sendMessageAction,
  sendMessageDisputeAction,
} from '../actions/message';

import {
  cancelMainTradeAction,
  acceptMainTradeAction,
  fetchSingleTradeData,
} from '../actions/trade';

import DisputeDialog from '../components/DisputeDialog'

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

const TradeDispute = (props) => {
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
  const textFieldRef = useRef();

  useEffect(() => {
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');
    console.log('currentTrade disputed Done');

    if (currentTrade.type === 'disputedDone') {
      console.log(currentTrade);
      history.push(`/trade/dispute/complete/${currentTrade.id}`);
    }
  }, [currentTrade]);

  const onBasicFieldChange = (event, newValue, previousValue, name) => {
    setDescriptionLength(newValue.length);
  };

  const handleFormSubmit = async (message) => {
    await dispatch(sendMessageDisputeAction(message, currentTrade.id));
  }
  const releaseToAdvertiser = async () => {
    await dispatch(adminCompleteDisputeAction(id, textFieldRef.current.value, 'advertiser'));
  }
  const releaseToTrader = async () => {
    await dispatch(adminCompleteDisputeAction(id, textFieldRef.current.value, 'trader'));
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid container item xs={12}>
          <h3>
            Ad #
            {currentTrade && currentTrade.postAd && currentTrade.postAd.id}
            {' '}
            | Trade #
            {currentTrade && currentTrade.id}
          </h3>
        </Grid>
        <Grid container item xs={12}>
          <h3>
            (This Trade Has Been Disputed By
            {' '}
            {currentTrade
            && currentTrade.dispute
             && currentTrade.dispute.length
             && currentTrade.dispute[0].initiator
             && currentTrade.dispute[0].initiator.username}
            )
          </h3>
        </Grid>
        <Grid container item xs={12}>
          <h3>
            Subject:
            {' '}
            {currentTrade
            && currentTrade.dispute
             && currentTrade.dispute.length
             && currentTrade.dispute[0].subject}

          </h3>
        </Grid>
        <Grid container item xs={12}>
          <p>
            reason:
            {' '}
            {currentTrade
            && currentTrade.dispute
             && currentTrade.dispute.length
             && currentTrade.dispute[0].reason}

          </p>
        </Grid>
        <Grid container item xs={12}>
          <p>
            advertisment #
            {currentTrade && currentTrade.postAd && currentTrade.postAd.id}
            {' '}
            by
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.user && currentTrade.postAd.user.username }
            {' '}
            at the exchange rate
            {' '}
            {currentTrade && currentTrade.price / 1e8}
            {' '}
            {currentTrade && currentTrade.postAd && currentTrade.postAd.currency.currency_name}
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
                {currentTrade && currentTrade.messages ? currentTrade.messages.map((item, index) => (
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
                <p />
              </Grid>

            </Grid>
            {
                currentTrade
                && currentTrade.postAd
                && currentTrade.postAd.paymentDetails
                && (
                <Grid container item xs={12}>
                  <Grid container item xs={12}>
                    <h3>Payment Details</h3>
                  </Grid>
                  <Grid container item xs={12}>
                    {currentTrade.postAd.paymentDetails}
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
                {currentTrade && currentTrade.user && currentTrade.user.username }
              </Grid>
              <Grid container item xs={6}>
                Advertiser
              </Grid>
              <Grid container item xs={6}>
                {currentTrade && currentTrade.postAd && currentTrade.postAd.user && currentTrade.postAd.user.username }
              </Grid>
              <Grid container item xs={6}>
                Deal Type
              </Grid>
              <Grid container item xs={6}>
                {currentTrade && currentTrade.postAd && currentTrade.postAd.type}
              </Grid>
              <Grid container item xs={6}>
                Deal amount
              </Grid>
              <Grid container item xs={6}>
                {currentTrade && currentTrade.amount / 1e8}
              </Grid>
              <Grid container item xs={6}>
                price
              </Grid>
              <Grid container item xs={6}>
                {currentTrade && currentTrade.price / 1e8}
              </Grid>
              <Grid container item xs={6}>
                total
              </Grid>
              <Grid container item xs={6}>
                {currentTrade && currentTrade.postAd && ((currentTrade.amount / 1e8) * (currentTrade.price / 1e8))}
              </Grid>
              <Grid container item xs={6}>
                Currency
              </Grid>
              <Grid container item xs={6}>
                {currentTrade && currentTrade.postAd && currentTrade.postAd.currency.currency_name}
              </Grid>
              <Grid container item xs={6}>
                Payment Method
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                  && currentTrade.postAd
                  && currentTrade.postAd.paymentMethod
                  && (
                  <span>
                    {currentTrade.postAd.paymentMethod.description}
                    {' '}
                    (
                    {currentTrade.postAd.paymentMethod.name}
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
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Grid container item xs={12}>
            <p>Chat With Moderator and disputed party:</p>
          </Grid>
          <Grid container item xs={12}>
            <div className="container">
              <div className="chat-container">
                {currentTrade
                && currentTrade.dispute
                && currentTrade.dispute.length
                && currentTrade.dispute[0].messagesDispute
                  ? currentTrade.dispute[0].messagesDispute.map((item, index) => (
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

            {user && user.role === 4 && (
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px' }}
              >
                <TextField
                  label="Conclusion"
                  multiline
                  style={{
                    width: '100%',
                  }}
                  rows={20}
                  inputRef={textFieldRef}
                  defaultValue=""
                  inputProps={{
                    maxLength: 400,
                  }}
                  variant="outlined"
                />
              </Grid>
            )}
            {user && user.role === 4 && (
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  onClick={releaseToTrader}
                >
                  Release funds to
                  {' '}
                  {currentTrade && currentTrade.user && currentTrade.user.username}
                </Button>
              </Grid>
            )}

            {user && user.role === 4 && (
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px' }}
              >
                <Button
                  variant="contained"
                  c
                  olor="primary"
                  type="submit"
                  className="btn"
                  fullWidth
                  size="large"
                  onClick={releaseToAdvertiser}
                >
                  Release funds to
                  {' '}
                  {currentTrade
                  && currentTrade.postAd
                  && currentTrade.postAd.user
                  && currentTrade.postAd.user.username}
                </Button>
              </Grid>
            )}

          </Grid>
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
// export default connect(mapStateToProps, actions)(TradeRequested);
export default connect(mapStateToProps, actions)(reduxForm({ form: 'messageDispute', validate })(TradeDispute));
