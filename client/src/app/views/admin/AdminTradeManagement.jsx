import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from '../../history';
import {
  fetchAdminTradesData,
} from '../../actions/admin';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const adminUserList = (props) => {
  const {
    adminTrades,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminTradesData()), [dispatch]);
  useEffect(() => {
  }, [adminTrades]);

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">stage</TableCell>
              <TableCell align="right">Ad user</TableCell>
              <TableCell align="right">Trade user</TableCell>
              <TableCell align="right">postAd type</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">currency</TableCell>
              <TableCell align="right">PaymentMethod</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminTrades
            && adminTrades.map((trade, i) => {
              console.log(trade);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {trade.id}
                  </TableCell>
                  <TableCell align="right">{trade.type}</TableCell>
                  <TableCell align="right">{trade.postAd.user.username}</TableCell>
                  <TableCell align="right">{trade.user.username}</TableCell>
                  <TableCell align="right">{trade.postAd.type}</TableCell>
                  <TableCell align="right">{trade.amount / 1e8}</TableCell>
                  <TableCell align="right">{trade.postAd.price / 1e8}</TableCell>
                  <TableCell align="right">{trade.postAd.currency.currency_name}</TableCell>
                  <TableCell align="right">{trade.postAd.paymentMethod.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => history.push(`/admin/trade/${trade.id}`)}
                      // onClick={() => clickUserInfo(user.id)}
                    >
                      Info
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
  console.log(state.adminUserList)
  return {
    adminTrades: state.adminTrades.data,
    user: state.user,
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps, null)(adminUserList);
