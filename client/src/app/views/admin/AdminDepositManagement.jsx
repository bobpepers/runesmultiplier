import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from '../../history';
import {
  fetchAdminDepositsData,
  banAdminUser,
} from '../../actions/admin';
import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const adminUserList = (props) => {
  const {
    adminUserList,
    adminDeposits,
    setUser,
    setPath,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminDepositsData()), [dispatch]);
  useEffect(() => {
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');
    console.log('adminDeposits');

    console.log(adminDeposits);
  }, [adminDeposits]);

  const ban = (id) => {
    dispatch(banAdminUser(id));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">user</TableCell>
              <TableCell align="right">txid</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminDeposits
            && adminDeposits.map((deposit, i) => {
              console.log(deposit);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {deposit.id}
                  </TableCell>
                  <TableCell align="right">{deposit.address.wallet.user.username}</TableCell>
                  <TableCell align="right">{deposit.txid}</TableCell>
                  <TableCell align="right">{deposit.amount / 1e8}</TableCell>
                  <TableCell align="right">{deposit.address.address}</TableCell>
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
  console.log(state.adminUserList)
  return {
    adminDeposits: state.adminDeposits.data,
    adminUserList: state.adminUserList,
    user: state.user,
    errorMessage: state.auth.error,
  };
}

const mapDispatchToProps = (dispatch) => ({
  rejectWithdrawal: (x) => dispatch(rejectWithdrawal(x)),
  acceptWithdrawal: (x) => dispatch(acceptWithdrawal(x)),
});

export default connect(mapStateToProps, mapDispatchToProps)(adminUserList);
