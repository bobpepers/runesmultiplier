import React, { useState, useEffect } from 'react';
import {
  Paper,
  // TextField,
  // MenuItem,
  Button,
  // IconButton,
  Input,
  InputLabel,
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import { uploadIdentity } from '../actions/identity';

const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: { touched, error },
  ...props
}) => (
  <>
    <Input
      accept="image/*"
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
    { touched && error && <div className="form-error">{error}</div> }
  </>
);

const IdentityVerify = (props) => {
  const {
    getPhoneCodeProp,
    verifyPhoneCodeProp,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    dispatch(uploadIdentity(data));
  }

  return (
    <div style={{

      backgroundColor: 'rgba(160, 160, 160, 0.2)',
    }}
    >
      <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60 }}>
        <h3>National ID/Passport</h3>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div style={{ marginTop: '15px' }}>
            <InputLabel style={{ width: '100%', display: 'block' }}>Front: </InputLabel>
            <Field
              name="front"
              component={FileInput}
              type="file"
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <InputLabel style={{ width: '100%', display: 'block' }}>Back: </InputLabel>
            <Field
              name="back"
              component={FileInput}
              type="file"
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <h3>Selfie with National ID/Passport</h3>
          </div>
          <div style={{ marginTop: '15px' }}>
            <InputLabel style={{ width: '100%', display: 'block' }}>Selfie: </InputLabel>
            <Field
              name="selfie"
              component={FileInput}
              type="file"
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.uploadAvatar);
  return {
    user: state.user.data,
    verifyPhoneCodeProp: state.verifyPhoneCode.data,
    getPhoneCodeProp: state.getPhoneCode.data,
  }
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.front) {
    errors.front = 'Front is required'
  }

  if (!formProps.back) {
    errors.back = 'Back is required'
  }

  if (!formProps.selfie) {
    errors.selfie = 'Selfie is required'
  }

  return errors;
}
const selector = formValueSelector('identityUpload');

export default connect(mapStateToProps, null)(reduxForm({ form: 'identityUpload', validate })(IdentityVerify));
