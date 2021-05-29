import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import Countdown from 'react-countdown';
import Card from '@material-ui/core/Card';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import * as actions from '../../actions/auth';

import {
  fetchPaymentMethodData,
} from '../../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../../actions/currencies';

import {
  sendMessageAction,
} from '../../actions/message';

import {
  cancelMainTradeAction,
  acceptMainTradeAction,
  fetchSingleTradeData,
} from '../../actions/trade';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function AlertDialogSlide(cellNumber) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="lotoCellBase LotoCell"
        onClick={handleClickOpen}
      >
        {cellNumber}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Are you sure you want to buy this cell?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Buy Cell #
            {cellNumber}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const TradeComplete = (props) => {
  const {
    // currentTrade,
  } = props;
  const dispatch = useDispatch();
  // const history = useHistory();
  console.log('RunesX Loto 100 View');
  // useEffect(() => dispatch(fetchSingleTradeData(id)), [dispatch]);

  return (
    <div className="height100 content surfContainer">
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
        >
          <h3 className="text-center">
            Win xxxx RUNES with Runes Loto 1000
          </h3>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHeadFiller" />
          <div className="lotoCellBase LotoCellHead">
            <p>0</p>
          </div>
          <div className="lotoCellBase LotoCellHead">
            1
          </div>
          <div className="lotoCellBase LotoCellHead">
            2
          </div>
          <div className="lotoCellBase LotoCellHead">
            3
          </div>
          <div className="lotoCellBase LotoCellHead">
            4
          </div>
          <div className="lotoCellBase LotoCellHead">
            5
          </div>
          <div className="lotoCellBase LotoCellHead">
            6
          </div>
          <div className="lotoCellBase LotoCellHead">
            7
          </div>
          <div className="lotoCellBase LotoCellHead">
            8
          </div>
          <div className="lotoCellBase LotoCellHead">
            9
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>0</p>
          </div>
          {AlertDialogSlide('00')}
          <div className="lotoCellBase LotoCell">
            01
          </div>
          <div className="lotoCellBase LotoCell">
            02
          </div>
          <div className="lotoCellBase LotoCell">
            03
          </div>
          <div className="lotoCellBase LotoCell">
            04
          </div>
          <div className="lotoCellBase LotoCell">
            05
          </div>
          <div className="lotoCellBase LotoCell">
            06
          </div>
          <div className="lotoCellBase LotoCell">
            07
          </div>
          <div className="lotoCellBase LotoCell">
            08
          </div>
          <div className="lotoCellBase LotoCell">
            09
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>1</p>
          </div>
          <div className="lotoCellBase LotoCell">
            10
          </div>
          <div className="lotoCellBase LotoCell">
            11
          </div>
          <div className="lotoCellBase LotoCell">
            12
          </div>
          <div className="lotoCellBase LotoCell">
            13
          </div>
          <div className="lotoCellBase LotoCell">
            14
          </div>
          <div className="lotoCellBase LotoCell">
            15
          </div>
          <div className="lotoCellBase LotoCell">
            16
          </div>
          <div className="lotoCellBase LotoCell">
            17
          </div>
          <div className="lotoCellBase LotoCell">
            18
          </div>
          <div className="lotoCellBase LotoCell">
            19
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>2</p>
          </div>
          <div className="lotoCellBase LotoCell">
            20
          </div>
          <div className="lotoCellBase LotoCell">
            21
          </div>
          <div className="lotoCellBase LotoCell">
            22
          </div>
          <div className="lotoCellBase LotoCell">
            23
          </div>
          <div className="lotoCellBase LotoCell">
            24
          </div>
          <div className="lotoCellBase LotoCell">
            25
          </div>
          <div className="lotoCellBase LotoCell">
            26
          </div>
          <div className="lotoCellBase LotoCell">
            27
          </div>
          <div className="lotoCellBase LotoCell">
            28
          </div>
          <div className="lotoCellBase LotoCell">
            29
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>3</p>
          </div>
          <div className="lotoCellBase LotoCell">
            30
          </div>
          <div className="lotoCellBase LotoCell">
            31
          </div>
          <div className="lotoCellBase LotoCell">
            32
          </div>
          <div className="lotoCellBase LotoCell">
            33
          </div>
          <div className="lotoCellBase LotoCell">
            34
          </div>
          <div className="lotoCellBase LotoCell">
            35
          </div>
          <div className="lotoCellBase LotoCell">
            36
          </div>
          <div className="lotoCellBase LotoCell">
            37
          </div>
          <div className="lotoCellBase LotoCell">
            38
          </div>
          <div className="lotoCellBase LotoCell">
            39
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>4</p>
          </div>
          <div className="lotoCellBase LotoCell">
            40
          </div>
          <div className="lotoCellBase LotoCell">
            41
          </div>
          <div className="lotoCellBase LotoCell">
            42
          </div>
          <div className="lotoCellBase LotoCell">
            43
          </div>
          <div className="lotoCellBase LotoCell">
            44
          </div>
          <div className="lotoCellBase LotoCell">
            45
          </div>
          <div className="lotoCellBase LotoCell">
            46
          </div>
          <div className="lotoCellBase LotoCell">
            47
          </div>
          <div className="lotoCellBase LotoCell">
            48
          </div>
          <div className="lotoCellBase LotoCell">
            49
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>5</p>
          </div>
          <div className="lotoCellBase LotoCell">
            50
          </div>
          <div className="lotoCellBase LotoCell">
            51
          </div>
          <div className="lotoCellBase LotoCell">
            52
          </div>
          <div className="lotoCellBase LotoCell">
            53
          </div>
          <div className="lotoCellBase LotoCell">
            54
          </div>
          <div className="lotoCellBase LotoCell">
            55
          </div>
          <div className="lotoCellBase LotoCell">
            56
          </div>
          <div className="lotoCellBase LotoCell">
            57
          </div>
          <div className="lotoCellBase LotoCell">
            58
          </div>
          <div className="lotoCellBase LotoCell">
            59
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>6</p>
          </div>
          <div className="lotoCellBase LotoCell">
            60
          </div>
          <div className="lotoCellBase LotoCell">
            61
          </div>
          <div className="lotoCellBase LotoCell">
            62
          </div>
          <div className="lotoCellBase LotoCell">
            63
          </div>
          <div className="lotoCellBase LotoCell">
            64
          </div>
          <div className="lotoCellBase LotoCell">
            65
          </div>
          <div className="lotoCellBase LotoCell">
            66
          </div>
          <div className="lotoCellBase LotoCell">
            67
          </div>
          <div className="lotoCellBase LotoCell">
            68
          </div>
          <div className="lotoCellBase LotoCell">
            69
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>7</p>
          </div>
          <div className="lotoCellBase LotoCell">
            70
          </div>
          <div className="lotoCellBase LotoCell">
            71
          </div>
          <div className="lotoCellBase LotoCell">
            72
          </div>
          <div className="lotoCellBase LotoCell">
            73
          </div>
          <div className="lotoCellBase LotoCell">
            74
          </div>
          <div className="lotoCellBase LotoCell">
            75
          </div>
          <div className="lotoCellBase LotoCell">
            76
          </div>
          <div className="lotoCellBase LotoCell">
            77
          </div>
          <div className="lotoCellBase LotoCell">
            78
          </div>
          <div className="lotoCellBase LotoCell">
            79
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>8</p>
          </div>
          <div className="lotoCellBase LotoCell">
            80
          </div>
          <div className="lotoCellBase LotoCell">
            81
          </div>
          <div className="lotoCellBase LotoCell">
            82
          </div>
          <div className="lotoCellBase LotoCell">
            83
          </div>
          <div className="lotoCellBase LotoCell">
            84
          </div>
          <div className="lotoCellBase LotoCell">
            85
          </div>
          <div className="lotoCellBase LotoCell">
            86
          </div>
          <div className="lotoCellBase LotoCell">
            87
          </div>
          <div className="lotoCellBase LotoCell">
            88
          </div>
          <div className="lotoCellBase LotoCell">
            89
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >
          <div className="lotoCellBase LotoCellHead">
            <p>9</p>
          </div>
          <div className="lotoCellBase LotoCell">
            90
          </div>
          <div className="lotoCellBase LotoCell">
            91
          </div>
          <div className="lotoCellBase LotoCell">
            92
          </div>
          <div className="lotoCellBase LotoCell">
            93
          </div>
          <div className="lotoCellBase LotoCell">
            94
          </div>
          <div className="lotoCellBase LotoCell">
            95
          </div>
          <div className="lotoCellBase LotoCell">
            96
          </div>
          <div className="lotoCellBase LotoCell">
            97
          </div>
          <div className="lotoCellBase LotoCell">
            98
          </div>
          <div className="lotoCellBase LotoCell">
            99
          </div>
        </Grid>

      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  user: state.user,
  // currentTrade: state.currentTrade.data,
});

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, null)(TradeComplete);
// export default connect(mapStateToProps, actions)(reduxForm({ form: 'message', validate })(Trade));
