import React, { useEffect, useState } from 'react';
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
  MenuItem,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import { makeStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import {
  fetchAdminCurrencyData,
  banAdminPublisher,
  fetchAdminCountryData,
  addAdminCountry,
  updateCountry,
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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl
    variant="outlined"
    fullWidth
  >
    <InputLabel id="demo-simple-select-filled-label">Currency</InputLabel>
    <Select
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      {...input}
      {...custom}
      inputProps={{
        name: 'currency',
        id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
)
const AdminPublishers = (props) => {
  const {
    adminPublishers,
    adminCountries,
    adminCurrencies,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminCountryData()), [dispatch]);
  useEffect(() => dispatch(fetchAdminCurrencyData()), [dispatch]);
  useEffect(() => {}, [adminCountries]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitIso, setUnitIso] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const [unitCurrency, setUnitCurrency] = useState(null);
  const onEdit = ({
    id, currentUnitIso, currentUnitName, currentUnitCurrency,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitIso(currentUnitIso);
    setUnitName(currentUnitName);
    setUnitCurrency(currentUnitCurrency);
  }

  const onSave = async ({ id }) => {
    // await updateCurrency();
    console.log(id);
    console.log(unitName);
    console.log(unitIso);
    console.log(unitCurrency);
    await dispatch(updateCountry(id, unitName, unitIso, unitCurrency));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitIso(null);
    setUnitName(null);
    setUnitCurrency(null);
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitIso(null);
    setUnitName(null);
  }

  const ban = (id) => {
    dispatch(banAdminPublisher(id));
  }
  const handleFormSubmit = async (obj) => {
    await dispatch(addAdminCountry(obj));
  }
  const update = (id) => {
    dispatch(updateCurrency(id));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={3}>
            <Field
              name="iso"
              component={renderField}
              type="iso"
              placeholder="iso"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="country"
              component={renderField}
              type="country"
              placeholder="country"
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              name="currency"
              component={renderSelectField}
              label="Currency"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {adminCurrencies
              && adminCurrencies.data
                && adminCurrencies.data.map((item) => <MenuItem value={item.id}>{item.currency_name}</MenuItem>)}
            </Field>
          </Grid>
          <Grid item xs={2}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              className="btn"
              fullWidth
            >
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
              <TableCell align="right">iso</TableCell>
              <TableCell align="right">currency</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCountries
            && adminCountries.data
            && adminCountries.data.map((country, i) => {
              console.log(country);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {country.id}
                  </TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === country.id ? (
                                      <input
                                        value={unitName}
                                        onChange={(event) => setUnitName(event.target.value)}
                                      />
                                    ) : (
                                      country.name
                                    )
                                }
                  </TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === country.id ? (
                                      <input
                                        value={unitIso}
                                        onChange={(event) => setUnitIso(event.target.value)}
                                      />
                                    ) : (
                                      country.iso
                                    )
                                }
                  </TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === country.id ? (
                                      <Select
                                        value={unitCurrency}
                                        onChange={(event) => setUnitCurrency(event.target.value)}
                                        // onChange={handleChange}
                                        // displayEmpty
                                        // className={classes.selectEmpty}
                                        // inputProps={{ 'aria-label': 'Without label' }}
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        {adminCurrencies
              && adminCurrencies.data
                && adminCurrencies.data.map((item) => <MenuItem value={item.id}>{item.currency_name}</MenuItem>)}
                                      </Select>
                                    ) : (
                                      country.currency && country.currency.currency_name
                                    )
                                }
                  </TableCell>
                  <TableCell align="right">{country.status ? 'Enabled' : 'Disabled'}</TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === country.id ? (
                                      <>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          size="large"
                                          onClick={() => onSave({
                                            id: country.id,
                                            iso: unitIso,
                                            name: unitName,
                                          })}
                                        >
                                          Save
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="primary"
                                          size="large"
                                          style={{ marginLeft: 8 }}
                                          onClick={() => onCancel()}
                                        >
                                          Cancel
                                        </Button>
                                      </>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => onEdit({
                                          id: country.id,
                                          currentUnitIso: country.iso,
                                          currentUnitName: country.name,
                                        })}
                                      >
                                        Edit
                                      </Button>
                                    )
                                }
                    {country.status
                      ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(country.id)}
                        >
                          Disable
                        </Button>
                      )
                      : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => ban(country.id)}
                        >
                          Enable
                        </Button>
                      )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => ban(country.id)}
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
  return {
    adminCountries: state.adminCountries,
    adminCurrencies: state.adminCurrencies,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.iso) {
    errors.iso = 'Iso is required'
  }

  if (!formProps.country) {
    errors.country = 'Country is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(AdminPublishers));
