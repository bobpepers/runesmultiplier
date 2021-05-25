import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Transactions from '../components/Transactions';
import { fetchUserData } from '../actions/user';

const WalletContainer = (props) => {
  const {
    user: {
      wallet,
    },
  } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  return (
    <div className="surfContainer">
      <Grid container>
        <Grid
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
        </Grid>
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
