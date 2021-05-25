import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import {
  fetchAdminPublishersData,
  banAdminPublisher,
  fetchAdminCountryData,
  addAdminCountry,
  fetchAdminPaymentMethodData,
  addAdminPaymentMethod,
  // dddCountryAdmin,
} from '../../actions/admin';
// import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';

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
      label="Bio"
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

const AdminPaymentMethod = (props) => {
  const {
    adminPaymentMethods,
    adminCountries,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminPaymentMethodData()), [dispatch]);
  useEffect(() => {}, [adminPaymentMethods]);

  const ban = (id) => {
    dispatch(banAdminPublisher(id));
  }
  const handleFormSubmit = async (obj) => {
    await dispatch(addAdminPaymentMethod(obj));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={5}>
            <Field
              name="name"
              component={renderField}
              type="name"
              placeholder="name"
            />
          </Grid>
          <Grid item xs={5}>
            <Field
              name="description"
              component={renderField}
              type="description"
              placeholder="description"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" type="submit" className="btn" fullWidth size="large">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminPaymentMethods
            && adminPaymentMethods.data
            && adminPaymentMethods.data.map((paymentMethod, i) => {
              console.log(paymentMethod);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {paymentMethod.id}
                  </TableCell>
                  <TableCell align="right">
                    {paymentMethod.name}
                  </TableCell>
                  <TableCell align="right">
                    {paymentMethod.description}
                  </TableCell>
                  <TableCell align="right">{paymentMethod.status ? 'Enabled' : 'Disabled'}</TableCell>
                  <TableCell align="right">
                    {paymentMethod.status
                      ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(paymentMethod.id)}
                        >
                          Disable
                        </Button>
                      )
                      : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(paymentMethod.id)}
                        >
                          Enable
                        </Button>
                      )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => ban(paymentMethod.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function mapStateToProps(state) {
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log('state.adminPaymentMethods');
  console.log(state.adminPaymentMethods);
  return {
    adminPaymentMethods: state.adminPaymentMethods,
    adminCountries: state.adminCountries,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'name is required'
  }

  if (!formProps.description) {
    errors.description = 'description is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminPaymentMethod', validate })(AdminPaymentMethod));
