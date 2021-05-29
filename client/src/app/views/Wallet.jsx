import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CloseIcon from '@material-ui/icons/Close';
import Transactions from '../components/Transactions';
import { fetchUserData } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function depositFunc(
  open,
  handleToggle,
  handleClose,
  classes,
  id,
  address,
  setCopySuccessful,
  copySuccessful,
) {
  let imagePath = '';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${address}`);
    setCopySuccessful(true);
  };
  QRCode.toDataURL(address, (err, imageUrl) => {
    if (err) {
      console.log('Could not generate QR code', err);
      return;
    }
    imagePath = imageUrl;
  });
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleToggle}
      >
        Deposit
      </Button>
      <Backdrop
        className={classes.backdrop}
        open={open}

        style={{
          zIndex: '5000',
          // position: 'relative',
        }}
      >
        <CloseIcon
          onClick={handleClose}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: 0,
            top: 0,
            color: 'red',
            fontSize: '75px',
          }}
        />
        <Grid container>
          <Grid
            item
            xs={12}
            className="text-center"
            style={{ display: 'block' }}
          >
            <img src={imagePath} alt="Deposit QR Code" />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <div>
              <p className="text-center">Runebase Address</p>
              <div className="borderAddress">
                <p className="text-center">
                  {address}
                </p>
                {
            copySuccessful
              ? (
                <p className="text-center" style={{ color: 'green' }}>
                  Copied!
                </p>
              ) : null
          }
                <Tooltip title="Copy Runebase Address" aria-label="show">
                  <Button
                      // className="borderAddress copyAddressButton"
                    variant="contained"
                    color="primary"
                    fullWidth
                      // style={{ padding: 0, float: 'right' }}
                    onClick={copyToClipboard}
                  >

                    <FileCopyIcon />
                    Copy
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Grid>
        </Grid>
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
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  useEffect(() => {
    console.log(wallets);
  }, [dispatch]);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [copySuccessful, setCopySuccessful] = useState(false);
  const handleClose = () => {
    setOpenDeposit(false);
  };
  const handleToggle = () => {
    setOpenDeposit(!openDeposit);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopySuccessful(false);
    }, 10000);
  }, [copySuccessful]) // pass `value` as a dependency
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
                {
                  depositFunc(
                    openDeposit,
                    handleToggle,
                    handleClose,
                    classes,
                    iWallet.cryptocurrency.id,
                    iWallet.addresses[0].address,
                    setCopySuccessful,
                    copySuccessful,
                  )
                }
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
