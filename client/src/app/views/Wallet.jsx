import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Transactions from '../components/Transactions';
import { fetchUserData } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SimpleBackdrop = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const WalletContainer = (props) => {
  const {
    user: {
      wallets,
    },
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  useEffect(() => {
    console.log(wallets);
  }, [dispatch]);
  return (
    <div className="surfContainer">
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            currency
          </Grid>
          <Grid item xs={2}>
            available
          </Grid>
          <Grid item xs={2}>
            locked
          </Grid>
          <Grid item xs={2}>
            total
          </Grid>
          <Grid item xs={2}>
            deposit
          </Grid>
          <Grid item xs={2}>
            Withdraw
          </Grid>
        </Grid>
        {wallets
          ? wallets.map((iWallet, i) => (
            <Grid container item xs={12}>
              <Grid item xs={2}>
                {iWallet.cryptocurrency.name}
              </Grid>
              <Grid item xs={2}>
                {iWallet.available}
              </Grid>
              <Grid item xs={2}>
                {iWallet.locked}
              </Grid>
              <Grid item xs={2}>
                {iWallet.available + iWallet.locked}
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Deposit
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          ))
          : (<CircularProgress />)}
        {/* <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className="walletMenuItem walletMenuItemActive"
        >
          <Link className="nav-link" to="/wallet">
            <p className="text-center">
              Overview
            </p>
          </Link>

        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className="walletMenuItem"
        >
          <Link className="nav-link" to="/wallet/receive">
            <p className="text-center">
              Receive
            </p>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className="walletMenuItem"
        >
          <Link className="nav-link" to="/wallet/send">
            <p className="text-center">
              Send
            </p>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: '20px' }}
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={4}
          className="glass"
          justify="center"
        >
          <span className="dashboardWalletItem">Available</span>
          <span>
            {wallet ? (wallet.available / 1e8) : 'loading'}
            {' '}
            RUNES
          </span>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={4}
          className="glass"
          justify="center"
        >
          <span className="dashboardWalletItem">Locked</span>
          <span className="dashboardWalletItem">
            {wallet ? (wallet.locked / 1e8) : 'loading'}
            {' '}
            RUNES
          </span>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={4}
          className="glass"
          justify="center"
        >
          <span className="dashboardWalletItem">Total</span>
          <span className="dashboardWalletItem">
            {wallet ? ((wallet.available + wallet.locked) / 1e8) : 'loading'}
            {' '}
            RUNES
          </span>
        </Grid>
        <Grid
          item
          xs={12}
          className="transactionsContainer"
        >
          <Transactions
            addresses={wallet && wallet.addresses || []}
            transactions={wallet
              && wallet.addresses
              && wallet.addresses[0]
              ? wallet.addresses[0].transactions
              : []}
          />
        </Grid> */}
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

WalletContainer.propTypes = {
  user: PropTypes.shape({
    wallet: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletContainer);
