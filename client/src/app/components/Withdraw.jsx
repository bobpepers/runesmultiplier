import React, { useState, useEffect } from 'react';
import {
  Button,
  // Modal,
  // Backdrop,
  // Fade,
  Grid,
} from '@material-ui/core';
import {
  reduxForm,
  Field,
  formValueSelector,
  reset,
} from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { fetchUserData } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const renderNumberField = (
  {
    input, label, meta: { touched, error }, ...custom
  },
) => (
  <FormControl variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
    <OutlinedInput
      label={label}
      fullWidth
      id="outlined-adornment-password"
      type="number"
      labelWidth={70}
      hintText={label}
      floatingLabelText={label}
      // onChange={calculateFee}
      errorText={touched && error}
      {...input}
      {...custom}
    />
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
);

const renderTextField = (
  {
    input, label, meta: { touched, error }, ...custom
  },
) => (
  <FormControl variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
    <OutlinedInput
      label={label}
      fullWidth
      id="outlined-adornment-password"
      type="text"
      labelWidth={70}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
);

const Withdraw = (props) => {
  const {
    errorMessage,
    createWithdraw,
    handleSubmit,
    pristine,
    submitting,
    createWithdrawPost,
    webslotId,
    idleWithdraw,
    user: {
      wallet,
    },
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fee, setFee] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUserData()), [dispatch]);

  useEffect(() => {
    if (createWithdrawPost.phase == 1) {
      setTimeout(() => { setOpen(false); }, 2000);
    }
  }, [createWithdrawPost.phase]);

  useEffect(() => {
    idleWithdraw();
  }, []);

  const calculateFee = (e) => {
    setFee((((e.target.value * 1e8) / 100) * 1) / 1e8);
    setTotal(e.target.value - (((e.target.value * 1e8) / 100) * 1) / 1e8)
  };

  const handleClose = () => {
    idleWithdraw();
    setOpen(false);
  };

  const myHandleSubmit = (e) => {
    e.id = webslotId;
    createWithdraw(e);
  }

  return (
    <div className="form-container index600 shadow-w signinContainer content">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className="walletMenuItem"
        >
          <Link className="nav-link" to="/wallet">
            <p className="text-center">
              Overview
            </p>
          </Link>

        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className="walletMenuItem"
        >
          <Link className="nav-link" to="/wallet/receive">
            <p className="text-center">
              Receive
            </p>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className="walletMenuItem walletMenuItemActive"
        >
          <Link className="nav-link" to="/wallet/send">
            <p className="text-center">
              Send
            </p>
          </Link>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(myHandleSubmit)}>
        <Grid
          container
          direction="column"
          spacing={3}
          style={{ marginTop: '20px' }}
        >
          <Grid item>
            <Field
              name="amount"
              component={renderNumberField}
              label="Amount"
              onChange={(e) => calculateFee(e)}
            />
          </Grid>
          <Grid item>
            <Field
              name="address"
              component={renderTextField}
              label="Address"
            />
          </Grid>
          <Grid item>
            <p>
              Minimum Amount: 5 RUNES
            </p>
            <p>
              Available:
              {' '}
              {(wallet && wallet.available / 1e8)}
              {' '}
              RUNES
            </p>
            <p>
              Fee 1%:
              {' '}
              {fee}
              {' '}
              RUNES
            </p>
            <p>
              Total:
              {' '}
              {total}
              {' '}
              RUNES
            </p>
          </Grid>
          <Grid item style={{ marginBottom: '20px' }}>
            {createWithdrawPost.isFetching
              ? <CircularProgress disableShrink />
              : (
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={pristine || submitting}
                  type="submit"
                  size="large"
                >
                  Withdraw
                </Button>
              )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

function onSubmitSuccess(result, dispatch) {
  dispatch(reset('order'));
}

function validate(formProps) {
  const errors = {};
  if (!formProps.amount) {
    errors.amount = 'Please enter amount'
  }
  if (!formProps.address) {
    errors.address = 'Please enter an address'
  }
  console.log(errors);
  return errors;
}

const selector = formValueSelector('withdraw');

function mapStateToProps(state) {
  return {
    createWithdrawPost: state.createWithdraw,
    errorMessage: state.form.withdraw ? state.form.withdraw.syncErrors : '',
    recaptchaValue: selector(state, 'captchaResponse'),
    user: state.user.data,
  }
}

Withdraw.propTypes = {
  user: PropTypes.shape({
    wallet: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, actions)(reduxForm({ form: 'withdraw', validate, onSubmitSuccess })(Withdraw));
