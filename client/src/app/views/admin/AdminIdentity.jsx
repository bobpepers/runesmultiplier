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
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchAdminPendingIdentityData,
  adminAcceptIdentity,
  adminRejectIdentity,
} from '../../actions/admin';
// import { rejectWithdrawal, acceptWithdrawal } from '../../actions/adminWithdraw';

function getModalStyle() {
  return {
    top: '75%',
    left: '75%',
    transform: 'translate(-75%, -75%)',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AdminPendingIdentityView = (props) => {
  const {
    adminPendingIdentity,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [openFront, setOpenFront] = React.useState(false);
  const [openBack, setOpenBack] = React.useState(false);
  const [openSelfie, setOpenSelfie] = React.useState(false);

  const handleOpenFront = () => {
    setOpenFront(true);
  };

  const handleCloseFront = () => {
    setOpenFront(false);
  };
  const handleOpenBack = () => {
    setOpenBack(true);
  };

  const handleCloseBack = () => {
    setOpenBack(false);
  };

  const handleOpenSelfie = () => {
    setOpenSelfie(true);
  };

  const handleCloseSelfie = () => {
    setOpenSelfie(false);
  };
  useEffect(() => dispatch(fetchAdminPendingIdentityData()), [dispatch]);
  useEffect(() => {
    console.log('adminPublishers');
    console.log(adminPendingIdentity);
  }, [adminPendingIdentity]);

  const accept = (id) => {
    dispatch(adminAcceptIdentity(id));
  }
  const reject = (id) => {
    dispatch(adminRejectIdentity(id));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Nickname</TableCell>
              <TableCell align="right">Full name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Front</TableCell>
              <TableCell align="right">Back</TableCell>
              <TableCell align="right">Selfie</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminPendingIdentity
            && adminPendingIdentity.map((userIdentity, i) => {
              console.log(userIdentity);
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {userIdentity.id}
                  </TableCell>
                  <TableCell align="right">{userIdentity.username}</TableCell>
                  <TableCell align="right">
                    {userIdentity.firstname}
                    {' '}
                    {userIdentity.lastname}
                  </TableCell>
                  <TableCell align="right">
                    +
                    {userIdentity.phoneNumber}
                  </TableCell>
                  <TableCell align="right">
                    <span onClick={handleOpenFront}>
                      <img src={`/api/identity/images/${userIdentity.username}/${userIdentity.identityFront}`} />
                    </span>
                    <Modal
                      open={openFront}
                      onClose={handleCloseFront}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <div style={modalStyle} className={classes.paper}>
                        <span
                          onClick={handleCloseFront}
                          style={{
                            position: 'relative',
                            left: '95%',
                            top: '5%',
                            color: 'red',
                            cursor: 'pointer',
                          }}
                        >
                          X close
                        </span>
                        <img src={`/api/identity/images/${userIdentity.username}/${userIdentity.identityFront}`} />
                      </div>
                    </Modal>
                  </TableCell>
                  <TableCell align="right">
                    <span onClick={handleOpenBack}>
                      <img src={`/api/identity/images/${userIdentity.username}/${userIdentity.identityBack}`} />
                    </span>
                    <Modal
                      open={openBack}
                      onClose={handleCloseBack}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <div style={modalStyle} className={classes.paper}>
                        <span
                          onClick={handleCloseBack}
                          style={{
                            position: 'relative',
                            left: '95%',
                            top: '5%',
                            color: 'red',
                            cursor: 'pointer',
                          }}
                        >
                          X close
                        </span>
                        <img src={`/api/identity/images/${userIdentity.username}/${userIdentity.identityBack}`} />
                      </div>
                    </Modal>
                  </TableCell>

                  <TableCell align="right">
                    <span onClick={handleOpenSelfie}>
                      <img src={`/api/identity/images/${userIdentity.username}/${userIdentity.identitySelfie}`} />
                    </span>
                    <Modal
                      open={openSelfie}
                      onClose={handleCloseSelfie}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <div style={modalStyle} className={classes.paper}>
                        <span
                          onClick={handleCloseSelfie}
                          style={{
                            position: 'relative',
                            left: '95%',
                            top: '5%',
                            color: 'red',
                            cursor: 'pointer',
                          }}
                        >
                          X close
                        </span>
                        <img src={`/api/identity/images/${userIdentity.username}/${userIdentity.identitySelfie}`} />
                      </div>
                    </Modal>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => accept(userIdentity.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => reject(userIdentity.id)}
                    >
                      Reject
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
    adminPendingIdentity: state.adminPendingIdentity.data,
  };
}

export default connect(mapStateToProps, null)(AdminPendingIdentityView);
