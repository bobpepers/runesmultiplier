import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScrollAnimation from 'react-animate-on-scroll';
import PropTypes from 'prop-types';
import { getVolume } from '../actions/volume';

const VolumeContainer = (props) => {
  const { volume } = props;
  const dispatch = useDispatch();
  useEffect(() => dispatch(getVolume()), [dispatch]);
  useEffect(() => {
    console.log('volume');
    console.log(volume);
  }, [volume]);

  return (
    <Grid
      container
      item
      xs={12}
      className="shadow-w"
    >

      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        className="index600 spacing-top"
      >
        <span className="dashboardWalletItem">
          24h completed trades
        </span>
        <span className="dashboardWalletItem">
          {volume.trade24
            ? volume.trade24
            : <CircularProgress disableShrink />}
        </span>

      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        className="index600 spacing-top"
      >

        <span className="dashboardWalletItem">
          24h trade volume
        </span>
        <span className="dashboardWalletItem">
          {volume.tradeVolume24
            ? `${(volume.tradeVolume24) / 1e8} RUNES`
            : <CircularProgress disableShrink />}
        </span>
      </Grid>
    </Grid>
  )
}

VolumeContainer.propTypes = {
  volume: PropTypes.shape({
    impressionVolume24: PropTypes.number.isRequired,
    impression: PropTypes.number.isRequired,
    impression24: PropTypes.number.isRequired,
    jackpot: PropTypes.number.isRequired,
    surf: PropTypes.number.isRequired,
    surfVolume24: PropTypes.number.isRequired,
    surf24: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  volume: state.volume.volume,
})

export default connect(mapStateToProps)(VolumeContainer);
