import React, { useEffect, useState } from 'react';
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
  TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { fetchAdminUserData } from '../../actions/admin';
import history from '../../history';
import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const adminUserComponent = (props) => {
  const {
    adminUser,
    selectedUser,
    match: {
      params: {
        id,
      },
    },
  } = props;
  // const currentLocation = window.location.pathname.split('/');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activities, setActivities] = useState([]);
  const [activitiesArchive, setActivitiesArchive] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const [rowsPerPageActivity, setRowsPerPageActivity] = React.useState(25);
  const [pageActivity, setPageActivity] = React.useState(0);
  const [rowsPerPageActivityArchive, setRowsPerPageActivityArchive] = React.useState(25);
  const [pageActivityArchive, setPageActivityArchive] = React.useState(0);
  useEffect(() => dispatch(fetchAdminUserData({ id })), [dispatch]);
  useEffect(() => {

  }, [adminUser]);

  useEffect(() => {
    if (adminUser.data) {
      setActivities([
        ...adminUser.data.earner,
        ...adminUser.data.spender,
      ]);
      // setActivitiesArchive([
      //  ...adminUser.data.archivedEarner,
      //  ...adminUser.data.archivedSpender,
      // ]);
    }
  }, [adminUser.data]);

  useEffect(() => {

  }, [activities]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePageActivity = (event, newPage) => {
    setPageActivity(newPage);
  };

  const handleChangeRowsPerPageActivity = (event) => {
    setRowsPerPageActivity(parseInt(event.target.value, 10));
    setPageActivity(0);
  };

  const handleChangePageActivityArchive = (event, newPage) => {
    setPageActivityArchive(newPage);
  };

  const handleChangeRowsPerPageActivityArchive = (event) => {
    setRowsPerPageActivityArchive(parseInt(event.target.value, 10));
    setPageActivityArchive(0);
  };

  if (adminUser.data) {
    return (
      <div className="content index600 height100">
        <Button
          style={{
            fontSize: '35px',
            color: 'black',
            position: 'absolote',
            left: '0',
            top: '0',
          }}
          variant="contained"
          color="primary"
          onClick={() => history.push('/admin/users')}
        >
          <ArrowBackIcon />

        </Button>
        <h3 className="shadow-w text-center">{adminUser.data.username}</h3>
        <p>
          firstName:
          {' '}
          {adminUser.data.firstname}
        </p>
        <p>
          lastname:
          {' '}
          {adminUser.data.lastname}
        </p>
        <Grid container>
          <Grid item xs={4}>
            <p className="shadow-w text-center">Available</p>
            <p className="shadow-w text-center">{adminUser.data.wallet.available / 1e8}</p>
          </Grid>
          <Grid item xs={4}>
            <p className="shadow-w text-center">locked</p>
            <p className="shadow-w text-center">{adminUser.data.wallet.locked / 1e8}</p>
          </Grid>
          <Grid item xs={4}>
            <p className="shadow-w text-center">total</p>
            <p className="shadow-w text-center">{(adminUser.data.wallet.available / 1e8) + (adminUser.data.wallet.locked / 1e8)}</p>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <h2 className="shadow-w text-center">
                    Activity
                    {' '}
                    {activities.length}
                  </h2>
                </Grid>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">type</TableCell>
                        <TableCell align="right">amount</TableCell>
                        <TableCell align="right">orderid/transactionid</TableCell>
                        <TableCell align="right">created</TableCell>
                        <TableCell align="right">balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activities.length > 0
                        && activities
                          .sort((a, b) => b.id - a.id)
                          .slice(pageActivity * rowsPerPageActivity, pageActivity * rowsPerPageActivity + rowsPerPageActivity)
                          .map((activity, i) => {
                            if (activity.type === 'referralBonus' && activity.spenderId === adminUser.data.id) {
                              return true;
                            }
                            return (
                              <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                  {activity.id}
                                </TableCell>
                                <TableCell align="right">{activity.type}</TableCell>
                                <TableCell align="right">{activity.amount / 1e8}</TableCell>
                                <TableCell align="right">
                                  {
                                      (() => {
                                        if (activity.orderId) {
                                          return activity.orderId
                                        }
                                        if (activity.transactionId) {
                                          return activity.transactionId
                                        }
                                        if (activity.txId) {
                                          return activity.txId
                                        }
                                        return <span>empty</span>
                                      })()
                                    }
                                </TableCell>
                                <TableCell align="right">{activity.createdAt}</TableCell>
                                <TableCell align="right">
                                  {
                                      (() => {
                                        if (activity.spenderId === adminUser.data.id) {
                                          return (activity.spender_balance / 1e8)
                                        }
                                        if (activity.earnerId === adminUser.data.id) {
                                          return (activity.earner_balance / 1e8)
                                        }
                                        return <span>empty</span>
                                      })()
                                    }
                                </TableCell>
                              </TableRow>
                            )
                          })}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component="span"
                    count={activities.length}
                    rowsPerPage={rowsPerPageActivity}
                    page={pageActivity}
                    onChangePage={handleChangePageActivity}
                    onChangeRowsPerPage={handleChangeRowsPerPageActivity}
                  />
                </TableContainer>
              </Grid>
            </Grid>
            <Grid item xs={12}>

              <Grid container>
                <Grid item xs={12}>
                  <h2 className="shadow-w text-center">
                    Activity
                    {' '}
                    {activitiesArchive.length}
                  </h2>
                </Grid>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">type</TableCell>
                        <TableCell align="right">amount</TableCell>
                        <TableCell align="right">orderid/transactionid</TableCell>
                        <TableCell align="right">created</TableCell>
                        <TableCell align="right">balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activitiesArchive.length > 0
                        && activitiesArchive
                          .sort((a, b) => b.id - a.id)
                          .slice(pageActivityArchive * rowsPerPageActivityArchive, pageActivityArchive * rowsPerPageActivityArchive + rowsPerPageActivityArchive)
                          .map((activity, i) => {
                            if (activity.type === 'referralBonus' && activity.spenderId === adminUser.data.id) {
                              return true;
                            }
                            return (
                              <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                  {activity.id}
                                </TableCell>
                                <TableCell align="right">{activity.type}</TableCell>
                                <TableCell align="right">{activity.amount / 1e8}</TableCell>
                                <TableCell align="right">
                                  {
                                      (() => {
                                        if (activity.orderId) {
                                          return activity.orderId
                                        }
                                        if (activity.transactionId) {
                                          return activity.transactionId
                                        }
                                        if (activity.txId) {
                                          return activity.txId
                                        }
                                        return <span>empty</span>
                                      })()
                                    }
                                </TableCell>
                                <TableCell align="right">{activity.createdAt}</TableCell>
                                <TableCell align="right">
                                  {
                                      (() => {
                                        if (activity.spenderId === adminUser.data.id) {
                                          return (activity.spender_balance / 1e8)
                                        }
                                        if (activity.earnerId === adminUser.data.id) {
                                          return (activity.earner_balance / 1e8)
                                        }
                                        return <span>empty</span>
                                      })()
                                    }
                                </TableCell>
                              </TableRow>
                            )
                          })}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component="span"
                    count={activitiesArchive.length}
                    rowsPerPage={rowsPerPageActivityArchive}
                    page={pageActivityArchive}
                    onChangePage={handleChangePageActivityArchive}
                    onChangeRowsPerPage={handleChangeRowsPerPageActivityArchive}
                  />
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
  return (
    <div>Loading...</div>
  )
}

function mapStateToProps(state) {
  console.log(state.adminUser)
  return {
    adminUser: state.adminUser,
    user: state.user,
    errorMessage: state.auth.error,
  };
}

const mapDispatchToProps = (dispatch) => ({
  rejectWithdrawal: (x) => dispatch(rejectWithdrawal(x)),
  acceptWithdrawal: (x) => dispatch(acceptWithdrawal(x)),
});

export default connect(mapStateToProps, mapDispatchToProps)(adminUserComponent);
