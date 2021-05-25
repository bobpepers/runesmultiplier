import React, {
  useEffect,
  useState,
  useRef,
  // Fragment,
} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { BigNumber } from 'bignumber.js';
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
  reset,
  submit,
} from 'redux-form';
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

import DisputeDialog from '../components/DisputeDialog'

// import { ChatLog } from '../components/ChatLog';

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
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log('currenTrade');
    console.log(currentTrade);
    if (currentTrade.userOneComplete === true && currentTrade.userTwoComplete === true) {
      console.log(currentTrade);
      history.push(`/trade/complete/${currentTrade.id}`);
    }
    if (currentTrade.userOneCancel === true && currentTrade.userTwoCancel === true) {
      console.log(currentTrade);
      history.push(`/trade/canceled/${currentTrade.id}`);
    }
  }, [currentTrade]);

  useEffect(() => {
    if (currentTrade.type === 'disputed') {
      console.log(currentTrade);
      history.push(`/trade/dispute/${currentTrade.id}`);
    }
  }, [currentTrade]);

  useEffect(() => {
    if (currentTrade) {
      dispatch(reset('message'));
    }
  }, [currentTrade]);

  const onBasicFieldChange = (event, newValue, previousValue, name) => {
    setDescriptionLength(newValue.length);
  };

  const handleFormSubmit = async (message) => {
    await dispatch(sendMessageAction(message, currentTrade.id));
  }

  const cancelTrade = async () => {
    // console.log(obj);
    await dispatch(cancelMainTradeAction(id));
  }

  const acceptTrade = async () => {
    // console.log(obj);
    await dispatch(acceptMainTradeAction(id));
  }

  const writeMessageElement = useRef(null);
  const handleKeyDown = async (e) => {
    console.log(writeMessageElement);
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      await dispatch(handleSubmit(handleFormSubmit));
      // writeMessageElement.current.onSubmit();
      // await dispatch(submit('message'));
    }
  };

  /// Messages
  const messageEl = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

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
            {currentTrade && new BigNumber(currentTrade.price).dividedBy(1e8).toString()}
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
              <div className="chat-container" ref={messageEl}>
                {currentTrade
                && currentTrade.messages
                  ? currentTrade.messages.map((item, index) => (
                    <div className="message chat-message__text">
                      <img className="avatar" src="/uploads/avatars/avatar.png" />
                      <div className="datetime">{item.createdAt}</div>
                      <p>
                        {item.user.username}
                        :
                      </p>
                      <p>
                        <pre>
                          {item.message.split('<br />').join('\n')}
                        </pre>
                      </p>
                    </div>
                  ))
                  : ''}
              </div>
            </div>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs={12} />
            <Grid item xs={12}>
              <h3>Send message to </h3>
            </Grid>
            <Grid item xs={12}>
              <form
                onKeyDown={(e) => { handleKeyDown(e); }}
                ref={writeMessageElement}
                onSubmit={handleSubmit(handleFormSubmit)}
              >
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                  >
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
                  {currentTrade
                  && currentTrade.postAd
                  && currentTrade.postAd.user
                  && currentTrade.postAd.user.username}
                  :
                  {' '}
                  {currentTrade
                  && currentTrade.userOneCancel === false
                  && currentTrade.userOneComplete === false
                  && (<span style={{ color: 'blue' }}>Waiting for Action</span>)}
                  {currentTrade
                  && currentTrade.userOneCancel === true
                  && currentTrade.userOneComplete === false
                  && (<span style={{ color: 'red' }}>Wants to cancel this trade</span>)}
                  {currentTrade
                  && currentTrade.userOneCancel === false
                  && currentTrade.userOneComplete === true
                  && (<span style={{ color: 'green' }}>Wants to complete this trade</span>)}
                </p>
                <p>
                  {currentTrade && currentTrade.user && currentTrade.user.username}
                  :
                  {' '}
                  {currentTrade
                  && currentTrade.userTwoCancel === false
                  && currentTrade.userTwoComplete === false
                  && (<span style={{ color: 'blue' }}>Waiting for Action</span>)}
                  {currentTrade
                  && currentTrade.userTwoCancel === true
                  && currentTrade.userTwoComplete === false
                  && (<span style={{ color: 'red' }}>Wants to cancel this trade</span>)}
                  {currentTrade
                  && currentTrade.userTwoCancel === false
                  && currentTrade.userTwoComplete === true
                  && (<span style={{ color: 'green' }}>Wants to complete this trade</span>)}
                </p>
              </Grid>
              <Grid item xs={12}>
                {currentTrade
          && currentTrade.postAd
          && currentTrade.postAd.type === 'sell'
          && currentTrade.postAd.user
          && user
          && user.username === currentTrade.user.username
          && (
          <p className="text-center">
            You want to buy
            {' '}
            {new BigNumber(currentTrade.amount).dividedBy(1e8).toString()}
            {' '}
            RUNES from
            {' '}
            {currentTrade.postAd.user.username}
            {' '}
            for
            {' '}
            {((new BigNumber(currentTrade.amount).dividedBy(1e8)).times(new BigNumber(currentTrade.price).dividedBy(1e8))).toString()}
            {' '}
            {currentTrade.postAd.currency.currency_name}
          </p>
          )}
                {currentTrade
          && currentTrade.postAd
          && currentTrade.postAd.type === 'sell'
          && currentTrade.postAd.user
          && user
          && user.username === currentTrade.postAd.user.username
          && (
          <p className="text-center">
            {currentTrade.user.username}
            {' '}
            wants to buy
            {' '}
            {new BigNumber(currentTrade.amount).dividedBy(1e8).toString()}
            {' '}
            RUNES from you for
            {' '}
            {((new BigNumber(currentTrade.amount).dividedBy(1e8)).times(new BigNumber(currentTrade.price).dividedBy(1e8))).toString()}
            {' '}
            {currentTrade.postAd.currency.currency_name}
          </p>
          )}
                {currentTrade
          && currentTrade.postAd
          && currentTrade.postAd.type === 'buy'
          && currentTrade.postAd.user
          && user
          && user.username === currentTrade.user.username
          && (
          <p className="text-center">
            You want to sell
            {' '}
            {new BigNumber(currentTrade.amount).dividedBy(1e8).toString()}
            {' '}
            RUNES to
            {' '}
            {currentTrade.postAd.user.username}
            {' '}
            for
            {' '}
            {((new BigNumber(currentTrade.amount).dividedBy(1e8)).times(new BigNumber(currentTrade.price).dividedBy(1e8))).toString()}
            {' '}
            {currentTrade.postAd.currency.currency_name}
          </p>
          )}
                {currentTrade
          && currentTrade.postAd
          && currentTrade.postAd.type === 'buy'
          && currentTrade.postAd.user
          && user
          && user.username === currentTrade.postAd.user.username
          && (
          <p className="text-center">
            {currentTrade.user.username}
            {' '}
            wants to sell
            {' '}
            {new BigNumber(currentTrade.amount).dividedBy(1e8).toString()}
            {' '}
            RUNES to you for
            {' '}
            {((new BigNumber(currentTrade.amount).dividedBy(1e8)).times(new BigNumber(currentTrade.price).dividedBy(1e8))).toString()}
            {' '}
            {currentTrade.postAd.currency.currency_name}
          </p>
          )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px' }}
              >

                {// Buy
                  }
                {
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userOneComplete === false
                  && currentTrade.userOneCancel === false
                  && currentTrade.postAd.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userOneComplete === true
                  && currentTrade.userOneCancel === false
                  && currentTrade.postAd.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.userTwoCancel === false
                  && currentTrade.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'sell'
                  && currentTrade.userTwoComplete === true
                  && currentTrade.userTwoCancel === false
                  && currentTrade.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userOneComplete === false
                  && currentTrade.userOneCancel === false
                  && currentTrade.postAd.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userOneComplete === true
                  && currentTrade.userOneCancel === false
                  && currentTrade.postAd.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.userTwoCancel === false
                  && currentTrade.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.type === 'buy'
                  && currentTrade.userTwoComplete === true
                  && currentTrade.userTwoCancel === false
                  && currentTrade.user.username === user.username
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

              <Grid
                item
                style={{ marginTop: '20px' }}
                xs={12}
              >
                {
                  currentTrade
                  && user
                  && currentTrade.postAd
                  // && currentTrade.postAd.type === 'buy'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.userTwoCancel === false
                  && currentTrade.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  // && currentTrade.postAd.type === 'buy'
                  && currentTrade.userTwoComplete === false
                  && currentTrade.userTwoCancel === true
                  && currentTrade.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.user
                  // && currentTrade.postAd.type === 'buy'
                  && currentTrade.userOneComplete === false
                  && currentTrade.userOneCancel === false
                  && currentTrade.postAd.user.username === user.username
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
                  currentTrade
                  && user
                  && currentTrade.postAd
                  && currentTrade.postAd.user
                  // && currentTrade.postAd.type === 'buy'
                  && currentTrade.userOneComplete === false
                  && currentTrade.userOneCancel === true
                  && currentTrade.postAd.user.username === user.username
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
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px' }}
              >
                <DisputeDialog
                  tradeId={id}
                />
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
                {currentTrade
                && currentTrade.user
                && currentTrade.user.username }
              </Grid>
              <Grid container item xs={6}>
                Advertiser
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                && currentTrade.postAd
                && currentTrade.postAd.user
                && currentTrade.postAd.user.username }
              </Grid>
              <Grid container item xs={6}>
                Deal Type
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                && currentTrade.postAd
                && currentTrade.postAd.type}
              </Grid>
              <Grid container item xs={6}>
                Deal amount
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                && new BigNumber(currentTrade.amount).dividedBy(1e8).toString()}
              </Grid>
              <Grid container item xs={6}>
                price
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                && new BigNumber(currentTrade.price).dividedBy(1e8).toString()}
              </Grid>
              <Grid container item xs={6}>
                total
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                && currentTrade.postAd
                && ((new BigNumber(currentTrade.amount).dividedBy(1e8)).times(new BigNumber(currentTrade.price).dividedBy(1e8))).toString()}
              </Grid>
              <Grid container item xs={6}>
                Currency
              </Grid>
              <Grid container item xs={6}>
                {currentTrade
                && currentTrade.postAd
                && currentTrade.postAd.currency.currency_name}
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
export default connect(mapStateToProps, actions)(reduxForm({
  form: 'message',
  validate,
  enableReinitialize: true,
  // onSubmit: submit,
})(Trade));
