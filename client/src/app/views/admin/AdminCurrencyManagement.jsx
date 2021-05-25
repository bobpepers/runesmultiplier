import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
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

// import { makeStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  Field,
  // formValueSelector,
  // change,
} from 'redux-form';
import {
  fetchAdminCurrencyData,
  addAdminCurrency,
  updateCurrency,
  // dddCountryAdmin,
} from '../../actions/admin';

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

const AdminCurrencies = (props) => {
  const {
    adminCurrencies,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitIso, setUnitIso] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const onEdit = ({ id, currentUnitIso, currentUnitName }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitIso(currentUnitIso);
    setUnitName(currentUnitName);
  }

  const onSave = async ({ id }) => {
    await dispatch(updateCurrency(id, unitName, unitIso));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitIso(null);
    setUnitName(null);
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

  useEffect(() => dispatch(fetchAdminCurrencyData()), [dispatch]);
  useEffect(() => { }, [adminCurrencies]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addAdminCurrency(obj));
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
              name="iso"
              component={renderField}
              type="iso"
              placeholder="iso"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn"
              fullWidth
              size="large"
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
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCurrencies
            && adminCurrencies.data
            && adminCurrencies.data.map((currency, i) => {
              console.log(currency);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {currency.id}
                  </TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === currency.id ? (
                                      <input
                                        value={unitName}
                                        onChange={(event) => setUnitName(event.target.value)}
                                      />
                                    ) : (
                                      currency.currency_name
                                    )
                                }
                  </TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === currency.id ? (
                                      <input
                                        value={unitIso}
                                        onChange={(event) => setUnitIso(event.target.value)}
                                      />
                                    ) : (
                                      currency.iso
                                    )
                                }

                  </TableCell>
                  <TableCell align="right">
                    {
                                    inEditMode.status && inEditMode.rowKey === currency.id ? (
                                      <>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          size="large"
                                          onClick={() => onSave({
                                            id: currency.id,
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
                                          id: currency.id,
                                          currentUnitIso: currency.iso,
                                          currentUnitName: currency.currency_name,
                                        })}
                                      >
                                        Edit
                                      </Button>
                                    )
                                }

                    {/* {country.status
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
                    </Button> */}
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
  console.log(state.adminPublishers);
  console.log(state.adminCountries);
  return {
    adminCurrencies: state.adminCurrencies,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.iso) {
    errors.iso = 'Iso is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(AdminCurrencies));
