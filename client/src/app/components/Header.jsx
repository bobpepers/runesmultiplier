import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  Navbar,
  Nav,
  // NavDropdown,
} from 'react-bootstrap';

import { withTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import LiveTvIcon from '@material-ui/icons/LiveTv';
// import MouseIcon from '@material-ui/icons/Mouse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  Badge,
  Button,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MobileNav from '../assets/images/mobileNav.svg';
import Notifications from './Notifications';
import {
  getPendingWithdrawalCount,
  getPendingIdentityCount,
  getPendingDisputeCount,

} from '../actions/adminCounts';

// import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => {
  // const { t } = props;
  const {
    t,
    i18n,
    authenticated,
    user,
    adminPendingWithdrawalsCount,
    adminPendingIdentityCount,
    adminPendingDisputeCount,
  } = props;
  const heightRef = useRef(null);
  const [ref, setRef] = useState(null);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);

  const handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });

  }

  const handleClose = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: false });
  }

  const handleWindowResize = useCallback((event) => {
    console.log('resize window');
    if (height !== heightRef.current.clientHeight) {
      // this.setState({ height: this.div.clientHeight });
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    if (user && user.role === 4) {
      dispatch(getPendingWithdrawalCount());
      dispatch(getPendingIdentityCount());
      dispatch(getPendingDisputeCount());
      const interval = setInterval(() => {
        dispatch(getPendingWithdrawalCount());
        dispatch(getPendingIdentityCount());
        dispatch(getPendingDisputeCount());
      }, 1 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => { }, [adminPendingWithdrawalsCount, adminPendingDisputeCount]);

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  const show = (menu) ? 'show' : '';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';
  const countryCode = (country) => {
    if (country == 'pt') {
      return 'br';
    }
    if (country == 'en') {
      return 'us';
    }
    if (country == 'nl') {
      return 'nl';
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickAdminMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdminMenu = () => {
    setAnchorEl(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleClickUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElLang, setAnchorElLang] = React.useState(null);

  const handleClickLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  // console.log(this.props.user);
  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <Link to={authenticated ? '/' : '/'} className="nav-link">LocalRunes.com</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav />
        </button>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`collapse navbar-collapse ${show}`}
        >
          <Nav className="mr-auto rNavbar">
            <Link
              className="nav-link"
              to="/buy-runes"
            >
              Buy RUNES
            </Link>
            <Link
              className="nav-link"
              to="/sell-runes"
            >
              Sell RUNES
            </Link>
            {
              authenticated
                 && (
                 <>
                   <Link
                     className="nav-link"
                     to="/post-ad"
                   >
                     Post a Trade
                   </Link>

                 </>
                 )
            }
            <Link
              className="nav-link"
              to="/contest"
            >
              Referral Contest
            </Link>

          </Nav>
          <ul>
            {
              authenticated
                && (
                  <>
                    <li>
                      <Notifications />
                    </li>
                  </>

                )

            }
          </ul>

          {
              authenticated && user && user.role === 4 && (
                <ul className="adminDropdownWrapper">
                  <li />
                  <li>

                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClickAdminMenu}
                      className="langPadding toggleLangWrapper"
                      id="user-nav-dropdown"
                      style={{ color: '#bdbdbd' }}
                    >
                      <Badge
                        badgeContent={adminPendingWithdrawalsCount
                        && Number(adminPendingDisputeCount)
                        + Number(adminPendingWithdrawalsCount)
                        + Number(adminPendingIdentityCount)}
                        color="secondary"
                      >
                        Admin

                      </Badge>

                      {' '}
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseAdminMenu}
                      className="langPadding toggleLangWrapper"
                    >
                      <MenuItem
                        onClick={handleCloseAdminMenu}
                      >
                        <div>
                          <Link
                            style={{ color: '#000' }}
                            className="nav-link"
                            to="/admin"
                          >
                            <AccountBalanceWalletIcon />
                            {' '}
                            Dashboard
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseAdminMenu}
                      >
                        <div>
                          <Link
                            style={{ color: '#000' }}
                            className="nav-link"
                            to="/admin/margin"
                          >
                            <AccountBalanceWalletIcon />
                            {' '}
                            Artificial Price Margin
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseAdminMenu}
                      >
                        <div>
                          <Link
                            style={{ color: '#000' }}
                            className="nav-link"
                            to="/admin/contestrewards"
                          >
                            <AccountBalanceWalletIcon />
                            {' '}
                            Contest Rewards
                          </Link>
                        </div>
                      </MenuItem>

                      <MenuItem
                        onClick={handleCloseAdminMenu}
                      >
                        <div>
                          <Link
                            style={{ color: '#000' }}
                            className="nav-link"
                            to="/admin/mail"
                          >
                            <AccountBalanceWalletIcon />
                            {' '}
                            Mass Mail
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseAdminMenu}
                      >
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/withdrawals/pending">
                            <SettingsIcon />
                            {' '}
                            Pending Withdrawals (
                            {adminPendingWithdrawalsCount || 0}
                            )
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/identity/pending">
                            <SettingsIcon />
                            {' '}
                            Pending Identity (
                            {adminPendingIdentityCount || 0}
                            )
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/disputes/pending">
                            <SettingsIcon />
                            {' '}
                            Pending Disputes (
                            {adminPendingDisputeCount || 0}
                            )
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/withdrawals">
                            <SettingsIcon />
                            {' '}
                            Withdrawals
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/deposits">
                            <SettingsIcon />
                            {' '}
                            Deposits
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/trades">
                            <SettingsIcon />
                            {' '}
                            Trades
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/users">
                            <AccountCircleIcon />
                            {' '}
                            User Managment
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/countries">
                            <FaceIcon />
                            {' '}
                            Countries
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/currencies">
                            <DashboardIcon />
                            {' '}
                            Currencies
                          </Link>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleCloseAdminMenu}>
                        <div>
                          <Link style={{ color: '#000' }} className="nav-link" to="/admin/paymentmethods">
                            <SettingsIcon />
                            {' '}
                            Payment Methods
                          </Link>
                        </div>
                      </MenuItem>
                    </Menu>
                  </li>
                </ul>
              )
  }
          {
              authenticated
                ? (
                  <ul>
                    <li>
                      <Button
                          // aria-controls="simple-menu"
                          // aria-haspopup="true"
                        onClick={handleClickUserMenu}
                        className="langPadding toggleLangWrapper"
                        id="user-nav-dropdown"
                        style={{ color: '#bdbdbd' }}
                      >
                        <Badge
                          color="secondary"
                        >
                          {user && user.username}

                        </Badge>

                        {' '}
                        <ArrowDropDownIcon />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorElUser}
                        keepMounted
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        className="langPadding toggleLangWrapper"
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link
                              style={{ color: '#000' }}
                              className="nav-link"
                              to="/wallet"
                            >
                              <AccountBalanceWalletIcon />
                              {' '}
                              Wallet
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link
                              style={{ color: '#000' }}
                              className="nav-link"
                              to="/profile"
                            >
                              <AccountCircleIcon />
                              {' '}
                              My Account
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link
                              style={{ color: '#000' }}
                              className="nav-link"
                              to={`/public_profile/${user && user.username}`}
                            >
                              <FaceIcon />
                              {' '}
                              Public Profle
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link
                              style={{ color: '#000' }}
                              className="nav-link"
                              to="/advertisements"
                            >
                              <DashboardIcon />
                              {' '}
                              Advertisements
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link
                              style={{ color: '#000' }}
                              className="nav-link"
                              to="/activity"
                            >
                              <AccessTimeIcon />
                              {' '}
                              Activity
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/settings">
                              <SettingsIcon />
                              {' '}
                              Settings
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div>
                            <Link style={{ color: '#000' }} className="nav-link" to="/signout">
                              <ExitToAppIcon />
                              {' '}
                              Logout
                            </Link>
                          </div>
                        </MenuItem>
                      </Menu>
                    </li>
                  </ul>

                )
                : (
                  <>
                    <ul>
                      <li>
                        <Link className="nav-link" to="/signup">Sign up</Link>
                      </li>
                      <li>
                        <Link className="nav-link" to="/signin">Sign in</Link>
                      </li>
                    </ul>
                  </>

                )
            }

          <Button
                          // aria-controls="simple-menu"
                          // aria-haspopup="true"
            onClick={handleClickLangMenu}
            className="langPadding toggleLangWrapper"
            id="user-nav-dropdown"
            style={{ color: '#bdbdbd' }}
          >
            <Badge
              color="secondary"
            >
              <span>
                <ReactCountryFlag countryCode={countryCode(`${getCurrentLng()}`)} svg />
                {' '}
                {t(`${getCurrentLng()}`)}
              </span>
            </Badge>

            {' '}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorElLang}
            keepMounted
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
            className="langPadding toggleLangWrapper"
          >
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('en');
              }}
            >
              <div>
                <ReactCountryFlag countryCode="us" svg />
                {' '}
                {t('en')}
              </div>
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('pt')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="br" svg />
                {' '}
                {t('pt')}
              </div>
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('nl')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="nl" svg />
                {' '}
                {t('nl')}
              </div>
            </MenuItem>
          </Menu>

        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
    adminPendingWithdrawalsCount: state.adminPendingWithdrawalsCount.data,
    adminPendingIdentityCount: state.adminPendingIdentityCount.data,
    adminPendingDisputeCount: state.adminPendingDisputeCount.data,
  };
}

export default connect(mapStateToProps)(withTranslation()(Header));
