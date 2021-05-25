import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
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
  MenuItem,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
// import * as actions from '../../actions/auth';

import {
  idleSendMassMailAction,
  sendMassMailAction,
} from '../../actions/admin';

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
      label="Optional"
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

const radioButton = ({
  input,
  meta: {
    touched,
    error,
  },
  ...rest
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="buy" control={<Radio />} label="Buy" />
        <FormControlLabel value="sell" control={<Radio />} label="Sell" />
      </RadioGroup>
    </FormControl>
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

const radioButtonPriceType = ({
  input,
  meta: {
    touched,
    error,
  },
  // checked,
  ...rest
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel
          value="static"
          control={<Radio />}
          label="Static Price (keep static price)"
        />
        <FormControlLabel
          value="margin"
          control={<Radio />}
          label="Margin Price (move price with coinpaprika.com index value)"
        />
      </RadioGroup>
    </FormControl>
    { touched && error && <div className="form-error">{error}</div> }
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
  defaultValue,
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
        name: input.name,
        // id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
)

const AdminMassMailView = (props) => {
  const {
    handleSubmit,
    adminMassMail,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {}, [adminMassMail]);
  useEffect(() => {
    idleSendMassMailAction();
  }, []);

  const handleFormSubmit = async (obj) => {
    console.log(obj);
    await dispatch(sendMassMailAction(obj));
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <h3 className="text-center">Legende</h3>
            <ul className="listPostAd">
              <li>First name: [firstname]</li>
              <li>Last name: [lastname]</li>
              <li>Country Name: [country_name]</li>
              <li>Country ISO: [country_iso]</li>
              <li>Currency Name: [currency_name]</li>
              <li>Currency ISO: [currency_iso]</li>
              <li>Username: [username]</li>
              <li>Referral: [referral]</li>
              <li>Wallet Balance: [wallet_balance]</li>
              <li>Wallet Value: [wallet_value]</li>
              <li>Wallet Value USD: [wallet_value_usd]</li>
              <li>Wallet android Link: [wallet_android]</li>
              <li>Metrics: [metrics]</li>
              <li>Markets: [markets]</li>
              <li>Social Links: [socials]</li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <p>Title</p>
                <Field
                  name="title"
                  component={renderField}
                  type="text"
                  placeholder="Title"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Message:</p>
                <Field
                  name="message"
                  component={renderTextField}
                  type="message"
                  placeholder="Message"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                {
                    adminMassMail && adminMassMail.isFetching
                      ? (<CircularProgress />)
                      : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="btn"
                          fullWidth
                          size="large"
                        >
                          Send Mass Mail
                        </Button>
                      )
                  }

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
  if (!formProps.title) {
    errors.title = 'Title is required'
  }
  if (!formProps.message) {
    errors.message = 'Message is required'
  }

  return errors;
}

const selector = formValueSelector('massmail');

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  adminMassMail: state.adminMassMail,
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, null)(reduxForm({
  form: 'massmail',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  updateUnregisteredFields: true,
  validate,
})(AdminMassMailView));
