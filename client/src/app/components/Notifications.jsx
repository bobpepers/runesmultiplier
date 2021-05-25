import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { withTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {
  fetchTradeData,
} from '../actions/trade';

const Notifications = (props) => {
  const { trade } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTradeData()), [dispatch]);
  useEffect(() => {
    console.log(trade);
  });
  useEffect(() => {
    console.log(trade);
  }, [trade]);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
  }

  const handleClose = (type, id) => {
    if (type === 'init') {
      history.push(`/trade/init/${id}`);
    }
    if (type === 'requested') {
      history.push(`/trade/requested/${id}`);
    }
    if (type === 'accepted') {
      history.push(`/trade/${id}`);
    }
    if (type === 'disputed') {
      history.push(`/trade/dispute/${id}`);
    }
    console.log(type);
    console.log(id);
    // this.setState({ anchorEl: event.currentTarget, open: false });
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickNotiMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotiMenu = (type, id) => {
    if (type === 'init') {
      history.push(`/trade/init/${id}`);
    }
    if (type === 'requested') {
      history.push(`/trade/requested/${id}`);
    }
    if (type === 'accepted') {
      history.push(`/trade/${id}`);
    }
    if (type === 'disputed') {
      history.push(`/trade/dispute/${id}`);
    }
    setAnchorEl(null);
  };

  return (
    <>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClickNotiMenu}
        className="langPadding toggleLangWrapper"
        id="user-nav-dropdown"
        style={{ color: '#bdbdbd' }}
      >
        <IconButton
          aria-label="show notifications"
          color="inherit"
          onClick={handleClick}
          style={{ padding: 0 }}
        >
          <Badge
            badgeContent={trade && trade.length && trade.length}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
          {' '}
          <ArrowDropDownIcon />

        </IconButton>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseNotiMenu}
        className="langPadding toggleLangWrapper"
      >
        {trade && trade.map((item) => (
          <MenuItem onClick={() => handleCloseNotiMenu(item.type, item.id)}>
            <div>
              Trade #
              {item.id}
              {' - '}
              {item.type}
            </div>
          </MenuItem>
        ))}

      </Menu>
    </>

  )
}

function mapStateToProps(state) {
  return {
    trade: state.trade.data,
  };
}

export default connect(mapStateToProps)(withTranslation()(Notifications));
