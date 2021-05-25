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
  fetchAdminMarginData,
  fetchAdminCurrencyData,
  // addAdminCurrency,
  // updateCurrency,
  updateMargin,
  fetchAdminNodeBalanceData,
  fetchAdminLiabilityData,
  // dddCountryAdmin,
} from '../../actions/admin';

const AdminCurrencies = (props) => {
  const {
    adminCurrencies,
    adminMargin,
    handleSubmit,
    adminNodeBalance,
    adminLiability,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitMargin, setUnitMargin] = useState(null);

  const onEdit = ({ id, currentUnitMargin }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitMargin(currentUnitMargin);
  }

  const onSave = async ({ id }) => {
    // await dispatch(updateCurrency(id, unitMargin));
    await dispatch(updateMargin(id, unitMargin));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitMargin(null);
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitMargin(null);
  }

  useEffect(() => dispatch(fetchAdminCurrencyData()), [dispatch]);
  useEffect(() => { }, [adminCurrencies]);
  useEffect(() => dispatch(fetchAdminMarginData()), [dispatch]);
  useEffect(() => dispatch(fetchAdminNodeBalanceData()), [dispatch]);
  useEffect(() => dispatch(fetchAdminLiabilityData()), [dispatch]);

  useEffect(() => {
    console.log(adminMargin);
  }, [adminMargin]);

  useEffect(() => {
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');
    console.log('adminNodeBalance');

    console.log(adminNodeBalance);
  }, [adminNodeBalance]);

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Grid container>
        <Grid item xs={4}>
          <h3>Node Balance</h3>
          <p>
            {adminNodeBalance && adminNodeBalance.data && adminNodeBalance.data}
          </p>
        </Grid>
        <Grid item xs={4}>
          <h3>Liability</h3>
          <p>
            {adminLiability && adminLiability.data && (adminLiability.data / 1e8)}
          </p>
        </Grid>
        <Grid item xs={4}>
          <h3>Profit</h3>
          <p>
            {
            adminNodeBalance
            && adminNodeBalance.data
            && adminLiability
            && adminLiability.data
            && adminNodeBalance.data
            && (((adminNodeBalance.data * 1e8) - adminLiability.data) / 1e8)
            }
          </p>
        </Grid>
      </Grid>
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">margin</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCurrencies
              && adminMargin.data
              && adminMargin.data.map((margin, i) => {
                console.log(margin);
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {margin.id}
                    </TableCell>
                    <TableCell align="right">
                      {
                                      inEditMode.status && inEditMode.rowKey === margin.id ? (
                                        <input
                                          value={unitMargin}
                                          onChange={(event) => setUnitMargin(event.target.value)}
                                        />
                                      ) : (
                                        margin.value
                                      )
                                  }

                    </TableCell>
                    <TableCell align="right">
                      {
                                      inEditMode.status && inEditMode.rowKey === margin.id ? (
                                        <>
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={() => onSave({
                                              id: margin.id,
                                              margin: unitMargin,
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
                                            id: margin.id,
                                            currentUnitMargin: margin.value,
                                          })}
                                        >
                                          Edit
                                        </Button>
                                      )
                                  }
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
    adminMargin: state.adminMargin,
    adminNodeBalance: state.adminNodeBalance,
    adminLiability: state.adminLiability,
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
