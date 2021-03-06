import React, { Component } from 'react';
import {
  reduxForm,
  formValueSelector,
  Field,
  change,
} from 'redux-form';
import { connect } from 'react-redux';
import {
  Button,
  TextField,
  FormControl,
  Grid,
} from '@material-ui/core';
import * as actions from '../../actions/resetPassword';
import Captcha from '../Captcha';

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
        id="outlined-username-field"
        label={placeholder}
        type={type}
        variant="outlined"
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const ResetPassword = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    resetPassword,
    errorMessage,
  } = props;

  const handleFormSubmit = async (formProps) => {
    await resetPassword(formProps);
  }

  return (
    <div className="form-container index600 shadow-w signinContainer content">
      <h2 className="textCenter">Reset Password</h2>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={4}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <div className="input-group">
                  <Field name="email" type="email" placeholder="type your email" component={renderField} />
                </div>
              </Grid>
              <Grid item>
                <Field component={Captcha} change={change} name="captchaResponse" />
              </Grid>
              <Grid item>
                <div>
                  { errorMessage && errorMessage.resetPassword
                && <div className="error-container">{ errorMessage.resetPassword }</div> }
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={pristine || submitting}
                  type="submit"
                  fullWidth
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>

          </form>
        </Grid>
      </Grid>
    </div>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Email is required'
  }

  if (!formProps.captchaResponse) {
    errors.captchaResponse = 'Please validate the captcha.';
  }

  return errors;
}

const selector = formValueSelector('resetpassword');
const mapStateToProps = (state) => ({
  errorMessage: state.resetPass.error,
  recaptchaValue: selector(state, 'captchaResponse'),
})

export default connect(mapStateToProps, actions)(reduxForm({ form: 'resetpassword', validate })(ResetPassword));
