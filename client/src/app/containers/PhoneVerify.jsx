import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  // MenuItem,
  Button,
  IconButton,
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getPhoneCode, verifyPhoneCode, idleVerifyPhoneCode } from '../actions/phone';

import Otp from '../components/VerifyPhoneOtp';

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

const PhoneVerify = (props) => {
  const {
    getPhoneCodeProp,
    verifyPhoneCodeProp,
  } = props;
  const [code, setCode] = useState('');
  const [pno, setPno] = useState('');
  const [otpShow, setOtpShow] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(idleVerifyPhoneCode());
  }, []);

  const getPhoneCodeAction = () => {
    console.log('123');
    const e = code + pno;
    console.log(e);
    dispatch(getPhoneCode(e));
  }

  const verifyPhoneCodeAction = () => {
    const phoneNumber = code + pno;
    dispatch(verifyPhoneCode(phoneNumber, otp));
  }

  return (
    <div style={{

      backgroundColor: 'rgba(160, 160, 160, 0.2)',
    }}
    >
      <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60 }}>
        {!otpShow ? <h3 style={{ marginLeft: 10, color: '#9f9f9f' }}>Verify Phone</h3> : (
          <IconButton
            onClick={() => {
              setOtpShow(false);
              setOtp('');
            }}
            size="small"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {!otpShow ? <h3>Enter your Phone Number</h3> : <h3>Enter the OTP</h3> }
        {otpShow ? <p>A One Time Password has been sent to your phone number for verification puposes.</p> : null}
        <div>
          {!otpShow ? (
            <div style={{
              display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around',
            }}
            >
              <div style={{
                alignItems: 'flex-end', justifyContent: 'center', display: 'flex', marginRight: 10, width: 60,
              }}
              >
                <TextField
                  id="code"
                  label="Code"
                  color="secondary"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                  }}
                />
              </div>
              <div>
                <TextField
                  id="phone"
                  label="Phone"
                  color="secondary"
                  value={pno}
                  onChange={(e) => {
                    if ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9') || !e.target.value) {
                      setPno(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          ) : <Otp otp={otp} setOtp={(val) => setOtp(val)} />}
          {otpShow ? (
            <div style={{
              width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5,
            }}
            >
              Didn't receive an OTP?
              {' '}
              <Button onClick={() => getPhoneCodeAction()} color="primary" style={{ textTransform: 'none', fontSize: 15 }}>Resend OTP</Button>
            </div>
          ) : null }
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
            <Button
              variant="contained"
              disabled={(pno.length < 9) || (code === null) || !isNumeric(pno) || (otpShow && otp.length !== 6)}
              color="secondary"
              style={{
                color: 'white',
                marginLeft: 'auto',
                textTransform: 'none',
              }}
              onClick={() => {
                if (otpShow) {
                  verifyPhoneCodeAction();
                } else {
                  setOtpShow(true);
                  getPhoneCodeAction();
                }
              }}
            >
              Verify
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.uploadAvatar);
  return {
    user: state.user.data,
    verifyPhoneCodeProp: state.verifyPhoneCode.data,
    getPhoneCodeProp: state.getPhoneCode.data,
  }
}

export default connect(mapStateToProps, null)(PhoneVerify);
