import React, {
  useEffect,
  useState,
} from 'react';
import {
  Drawer,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { connect, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import CastIcon from '@material-ui/icons/Cast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

import { fetchUserData } from '../../actions/user';
import * as actions from '../../actions/auth';
import AdminUserList from './AdminUserList';
import AdminWithdrawals from './AdminWithdrawals';
import AdminIdentity from './AdminIdentity';
import AdminReviewBanners from './AdminReviewBanners';
import AdminReviewPublishers from './AdminReviewPublishers';
import AdminUser from './AdminUser';
import AdminDomains from './AdminDomains';
import AdminFeeConfig from './AdminFeeConfig';
import AdminCountryManagement from './AdminCountryManagement';
import AdminCurrencyManagement from './AdminCurrencyManagement';
import AdminAdManagement from './AdminAdManagement';
import AdminPaymentMethodManagement from './AdminPaymentMethodManagement';
import AdminDashboard from './AdminDashboard';
import {
  fetchAdminUserListData,
  fetchAdminPendingIdentityData,
} from '../../actions/admin';
// import * as actions from '../actions/user';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 0,
  },
  menuButton: {
    float: 'right',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    marginTop: '50px',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    marginTop: '50px',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop: '50px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Admin = (props) => {
  const {
    user,
    adminUserList,
    adminPendingIdentity,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openSubMenuWallet, setOpenSubMenuWallet] = useState(true);
  const [selectedUser, setSelectedUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAdminUserListData()), [dispatch]);
  useEffect(() => {}, [adminUserList]);

  const [dashboardPath, setDashboardPath] = useState('users');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (e) => {
    setDashboardPath(e);
  }
  useEffect(() => {}, [dashboardPath]);

  useEffect(() => dispatch(fetchUserData()), [dispatch]);

  useEffect(() => dispatch(fetchAdminPendingIdentityData()), [dispatch]);
  useEffect(() => {
    console.log('adminPublishers');
    console.log(adminPendingIdentity);
  }, [adminPendingIdentity]);

  useEffect(() => {
    document.title = 'RunesX - Admin Dashboard';
  }, []);

  return (
    <div className={`${classes.root} content dashboardContainer index600 height100`}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={`sidebar ${clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}`}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />
        <List>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: !open,
            })}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <ChevronRightIcon />
          </IconButton>
        </List>
        <List>
          <ListItem
            button
            key="dashboard"
            className={dashboardPath === 'dashboard' && 'sideMenuActive'}
            onClick={() => handleMenuClick('dashboard')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {/* <ListItem
            button
            key="feeConfig"
            className={dashboardPath === 'feeConfig' && 'sideMenuActive'}
            onClick={() => handleMenuClick('feeConfig')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Fee configuration" />
          </ListItem> */}
          <ListItem
            button
            key="users"
            className={dashboardPath === 'users' && 'sideMenuActive'}
            onClick={() => handleMenuClick('users')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="User Managment" />
          </ListItem>
          <ListItem
            button
            key="identity"
            className={dashboardPath === 'identity' && 'sideMenuActive'}
            onClick={() => handleMenuClick('identity')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary={`Pending Identity (${adminPendingIdentity && adminPendingIdentity.length ? adminPendingIdentity.length : 0})`} />
          </ListItem>
          <ListItem
            button
            key="countryManagment"
            className={dashboardPath === 'countryManagment' && 'sideMenuActive'}
            onClick={() => handleMenuClick('countryManagment')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Country Management" />
          </ListItem>
          <ListItem
            button
            key="currencyManagment"
            className={dashboardPath === 'currencyManagment' && 'sideMenuActive'}
            onClick={() => handleMenuClick('currencyManagment')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Currency Managment" />
          </ListItem>
          <ListItem
            button
            key="adManagement"
            className={dashboardPath === 'adManagement' && 'sideMenuActive'}
            onClick={() => handleMenuClick('adManagement')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Ads Managment" />
          </ListItem>
          <ListItem
            button
            key="paymentMethodManagement"
            className={dashboardPath === 'paymentMethodManagement' && 'sideMenuActive'}
            onClick={() => handleMenuClick('paymentMethodManagement')}
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Payment Method Managment" />
          </ListItem>
          <ListItem
            button
            key="withdrawals"
            className={dashboardPath === 'withdrawals' && 'sideMenuActive'}
            onClick={() => handleMenuClick('withdrawals')}
          >
            <ListItemIcon>
              <CastIcon />
            </ListItemIcon>
            <ListItemText primary="Withdrawals" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <div className={`${classes.content} w-100`}>

        {
          dashboardPath === 'dashboard' && (
          <AdminDashboard />
          )
        }
        {
          dashboardPath === 'feeConfig' && (
          <AdminFeeConfig />
          )
        }
        {
          dashboardPath === 'countryManagment' && (
          <AdminCountryManagement />
          )
        }
        {
          dashboardPath === 'currencyManagment' && (
          <AdminCurrencyManagement />
          )
        }
        {
          dashboardPath === 'adManagement' && (
          <AdminAdManagement />
          )
        }
        {
          dashboardPath === 'paymentMethodManagement' && (
          <AdminPaymentMethodManagement />
          )
        }

        {
          dashboardPath === 'users' && (
          <AdminUserList
            setUser={(id) => { setSelectedUser(id) }}
            setPath={(path) => { setDashboardPath(path) }}
          />
          )
        }
        {
          dashboardPath === 'user' && (
          <AdminUser
            selectedUser={selectedUser}
          />
          )
        }
        {
          dashboardPath === 'withdrawals' && (
          <AdminWithdrawals />
          )
        }
        {
          dashboardPath === 'identity' && (
          <AdminIdentity />
          )
        }
        {
          dashboardPath === 'reviewPublishers' && (
            <AdminReviewPublishers />
          )
        }
        {
          dashboardPath === 'reviewBanners' && (
            <AdminReviewBanners />
          )
        }
        {
          dashboardPath === 'domains' && (
            <AdminDomains />
          )
        }

      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    adminUserList: state.adminUserList,
    user: state.user.data,
    errorMessage: state.auth.error,
    adminPendingIdentity: state.adminPendingIdentity.data,
    // users: state.user.list,
  };
}

export default connect(mapStateToProps, actions)(Admin);
