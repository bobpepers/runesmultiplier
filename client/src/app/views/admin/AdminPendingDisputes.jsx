import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import { fetchAdminPendingWithdrawalData, fetchAdminPendingDisputesData } from '../../actions/admin';
// import { fetchUserData } from '../../actions/user';
import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';
import history from '../../history';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AdminPendingWithdrawals = (props) => {
  const {
    adminPendingWithdrawals,
    adminPendingDisputes,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminPendingWithdrawalData()), [dispatch]);
  useEffect(() => dispatch(fetchAdminPendingDisputesData()), [dispatch]);

  useEffect(() => {}, [adminPendingWithdrawals, adminPendingDisputes]);

  const reject = (obj) => {
    console.log(`reject ${obj}`)
    props.rejectWithdrawal({ id: obj });
  };

  const accept = (obj) => {
    props.acceptWithdrawal({ id: obj });
  };

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">date</TableCell>
              <TableCell align="right">ad side</TableCell>
              <TableCell align="right">advertiser</TableCell>
              <TableCell align="right">trader</TableCell>
              <TableCell align="right">initiator</TableCell>
              <TableCell align="right">releasedTo</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminPendingDisputes
            && adminPendingDisputes.map((dispute, i) => {
              console.log(dispute);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {dispute.id}
                  </TableCell>
                  <TableCell align="right">{dispute.createdAt}</TableCell>
                  <TableCell align="right">{dispute.trade.postAd.type}</TableCell>
                  <TableCell align="right">{dispute.trade.postAd.user.username}</TableCell>
                  <TableCell align="right">{dispute.trade.user.username}</TableCell>
                  <TableCell align="right">{dispute.initiator.username}</TableCell>
                  <TableCell align="right">{dispute.releasedTo && dispute.releasedTo.username}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => history.push(`/trade/dispute/${dispute.trade.id}`)}
                      // onClick={() => reject(withdraw.id)}
                    >
                      Resolve Issue
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
  console.log('......;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;adminWithdrawals mapStateToProps');
  console.log(state.adminPendingWithdrawals);
  return {
    adminPendingWithdrawals: state.adminPendingWithdrawals.data,
    adminPendingDisputes: state.adminPendingDisputes.data,
    user: state.user,
    errorMessage: state.auth.error,
  };
}

const mapDispatchToProps = (dispatch) => ({
  rejectWithdrawal: (x) => dispatch(rejectWithdrawal(x)),
  acceptWithdrawal: (x) => dispatch(acceptWithdrawal(x)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPendingWithdrawals);
