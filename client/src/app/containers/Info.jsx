import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { IoIosPeople, IoMdGitNetwork } from 'react-icons/io';
import ScrollAnimation from 'react-animate-on-scroll';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getRequestRegister } from '../actions/registered';
import Logo from '../assets/images/LG2.png';
import LrLogo from '../assets/images/LR-logo.svg'

const InfoContainer = (props) => {
  const {
    registered,
    online,
  } = props;
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(1);

  useEffect(() => dispatch(getRequestRegister()), [dispatch]);

  return (
    <div style={{ width: '100%' }}>
      <Grid
        container
        item
        xs={12}
        className="shadow-w spacing-top"
        alignItems="center"
        justify="center"
      >
        <Box
          component={Grid}
          item
          className="index600"
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          display={{
            xs: 'none',
            sm: 'none',
            md: 'block',
            lg: 'block',
            xl: 'block',
          }}
        >
          {/* <ScrollAnimation
            animateIn="slideInLeft"
            animateOut="slideOutLeft"
            duration={2}
            delay={0}
            offset={0}
          > */}
          <IoIosPeople style={{ width: '100%', fontSize: '60px' }} />
          <span className="dashboardWalletItem">Registered</span>
          <span className="dashboardWalletItem">{registered || <CircularProgress disableShrink />}</span>
          {/* </ScrollAnimation> */}
        </Box>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          lg={4}
          xl={4}
          className="index600"
          align="center"
        >
          {/* <ScrollAnimation
            animateIn="zoomInDown"
            animateOut="zoomOutUp"
            duration={2}
            delay={0}
            offset={0}
          > */}
          <span>
            <LrLogo
              style={{ width: '50%' }}
            />
          </span>

          {/* </ScrollAnimation> */}
        </Grid>
        <Box
          component={Grid}
          item
          className="index600"
          xs={6}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          display={{
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
            xl: 'none',
          }}
        >
          {/* <ScrollAnimation
            animateIn="slideInLeft"
            animateOut="slideOutLeft"
            duration={2}
            delay={0}
            offset={0}
          > */}
          <IoIosPeople style={{ width: '100%', fontSize: '60px' }} />
          <span className="dashboardWalletItem">Registered</span>
          <span className="dashboardWalletItem">{registered || <CircularProgress disableShrink />}</span>
          {/* </ScrollAnimation> */}
        </Box>
        <Box
          component={Grid}
          item
          className="index600"
          xs={6}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          display={{
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
            xl: 'none',
          }}
        >
          {/* <ScrollAnimation
            animateIn="slideInRight"
            animateOut="slideOutRight"
            duration={2}
            delay={0}
            offset={0}
          > */}
          <IoMdGitNetwork style={{ width: '100%', fontSize: '60px' }} />
          <span className="dashboardWalletItem">Online</span>
          <span className="dashboardWalletItem">
            {online || <CircularProgress disableShrink />}
          </span>
          {/* </ScrollAnimation> */}
        </Box>
        <Box
          component={Grid}
          item
          className="index600"
          xs={6}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          display={{
            xs: 'none',
            sm: 'none',
            md: 'block',
            lg: 'block',
            xl: 'block',
          }}
        >
          {/* <ScrollAnimation
            animateIn="slideInRight"
            animateOut="slideOutRight"
            duration={2}
            delay={0}
            offset={0}
          > */}
          <IoMdGitNetwork style={{ width: '100%', fontSize: '60px' }} />
          <span className="dashboardWalletItem">Online</span>
          <span className="dashboardWalletItem">
            {online || <CircularProgress disableShrink />}
          </span>
          {/* </ScrollAnimation> */}
        </Box>
        <Grid
          item
          xs={12}
          className="index600"
          align="center"
        >
          <div className="shadow-w nopointer row justify-content-center">
            <div className="position-relative align-self-center osdlwrapper">
              {/* <ScrollAnimation
                animateIn="bounceIn"
                animateOut="bounceOut"
                duration={2}
                delay={0}
                offset={0}
              > */}
              <h2 className="position-relative">Buy & Sell RUNES Easily.</h2>
              {/* </ScrollAnimation>
              <ScrollAnimation
                animateIn="bounceIn"
                animateOut="bounceOut"
                duration={2}
                delay={0}
                offset={0}
              > */}
              <p className="position-relative">Trade RUNES Online using secure escrow service.</p>
              <p className="position-relative">With Low fees & many ways of payment methods for you to complete your Trade Digitally.</p>
              {/* </ScrollAnimation> */}
            </div>
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
        >
          <div
            id="runesx-1"
            key={rerender}
          />
        </Grid>
      </Grid>
    </div>
  )
}

InfoContainer.propTypes = {
  registered: PropTypes.number.isRequired,
  online: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  registered: state.registered.people,
  online: state.online.people,
})

export default connect(mapStateToProps)(InfoContainer);
