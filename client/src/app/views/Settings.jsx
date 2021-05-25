import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { fetchUserData } from '../actions/user'
import EnableTFA from '../components/settings/Enable2FA';
import DisableTFA from '../components/settings/Disable2FA';

const Settings = (props) => {
  const {
    user: {
      data,
    },
  } = props;
  document.title = 'LocalRunes - Settings';
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  useEffect(() => {
    console.log('Settings props.user effect');
    // console.log(data && data.tfa);
  }, [props.user]);
  useEffect(() => {
    document.title = 'LocalRunes - Settings';
  }, []);
  console.log('Views/Settings props.user.data.username');
  console.log(props.user.data ? data.tfa : '');
  return (
    <Grid
      container
      className="surfContainer"
      style={{ marginBottom: '20px' }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3 className="text-center">
            Two Factor Authentication
          </h3>
        </Grid>
        <Grid container justify="center">
          { data && data.tfa === false
            ? <EnableTFA />
            : <DisableTFA />}
        </Grid>
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  console.log('Settings mapStateToProps');
  console.log(state.user);
  return {
    user: state.user,
    errorMessage: state.auth.error,
  };
}
export default connect(mapStateToProps)(Settings);
