import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Countdown from 'react-countdown';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import * as actions from '../actions/auth';
import PolicyImage from '../assets/images/policy.svg';
// import Globe from '../containers/Globe';
import {
  fetchReferralContests,
  fetchContestRewards,
  fetchContestStatstics,
} from '../actions/referralContests';

const ReferralContestView = (props) => {
  const {
    referralContestRewards,
    referralContestStats,
    referralContests,
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [previousContests, setPreviousContests] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    document.title = 'LocalRunes - Referral Contest';
  }, []);

  useEffect(() => {
    dispatch(fetchReferralContests());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchContestRewards());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchContestStatstics());
  }, [dispatch]);

  useEffect(() => {

  }, [referralContestRewards]);

  useEffect(() => {

  }, [referralContestRewards]);

  useEffect(() => {
    if (referralContests && referralContests.data && referralContests.data.length > 0) {
      setPreviousContests(referralContests.data.slice(1));
    }
    console.log(referralContests);
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log('previousContests');
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
    console.log(previousContests);
  }, [referralContests]);

  const renderer = ({
    days, hours, minutes, seconds, completed,
  }) => (
    <>
      {days}
      {' '}
      days
      {' '}
      {hours}
      {' '}
      hours
      {' '}
      {minutes}
      {' '}
      minutes
      {' '}
      {seconds}
      {' '}
      seconds
    </>
  );

  return (
    <div className="height100 content surfContainer">
      <Grid container align="center" alignConent="center" alignItems="center">
        <Grid item xs={12}>
          <Card>
            <h3 className="text-center">Contest rules</h3>
            <ul className="listPostAd">
              <li>You have to be fully verfied to participate (email, phone and identity)</li>
              <li>Your referral needs to have registered during contest round</li>
              <li>Your referral needs to be fully verified (email, phone and identity)</li>
              <li>Your referral needs to have completed atleast 1 trade</li>
              <li>Your referral needs to have atleast 2000 RUNES available in his/her wallet during contest round</li>
              <li>You need to collect atleast 10 referrals in the weeks round to qualify for winning</li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <h3 className="mb15">This weeks winner rewards</h3>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div className="price-block gold">
            <div className="rank-cell">
              1st place
            </div>
            <div className="price-cell">
              {
              referralContestRewards
              && referralContestRewards.data
              && referralContestRewards.data.length
                ? referralContestRewards.data[0].firstPlace
                : (<CircularProgress />)
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div className="price-block silver">
            <div className="rank-cell">
              2th place
            </div>
            <div className="price-cell">
              {
              referralContestRewards
              && referralContestRewards.data
              && referralContestRewards.data.length
                ? referralContestRewards.data[0].secondPlace
                : (<CircularProgress />)
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <div className="price-block bronze">
            <div className="rank-cell">
              3th place
            </div>
            <div className="price-cell">
              {
              referralContestRewards
              && referralContestRewards.data
              && referralContestRewards.data.length
                ? referralContestRewards.data[0].thirdPlace
                : (<CircularProgress />)
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h3 className="mb15">Ends in</h3>
        </Grid>
        <Grid item xs={12}>
          {
              referralContests
              && referralContests.data
              && referralContests.data.length
                ? (
                  <Grid item xs={4}>
                    <p className="dashboardWalletItem shadow-w">
                      <Countdown
                        key={new Date(referralContests.data[0].endsAt).valueOf()}
                        date={new Date(referralContests.data[0].endsAt).valueOf()}
                        renderer={renderer}
                      />
                    </p>
                  </Grid>

                )
                : (<CircularProgress />)
              }

        </Grid>
        <Grid item xs={12}>
          <h3 className="mb15">
            Winners Week #
            {
            previousContests
            && previousContests
            && previousContests.length > 0
            && previousContests[page - 1].id
            }
          </h3>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div className="price-block gold">
            <div className="rank-cell">
              1st place
            </div>
            <div className="price-cell">
              {
              previousContests
              && previousContests
              && previousContests.length
                ? (
                  <>
                    <p>
                      {previousContests[page - 1].winner_first ? previousContests[page - 1].winner_first.username : 'n/a'}
                    </p>
                    <p>
                      {previousContests[page - 1].first_place_reward}
                    </p>
                  </>

                )
                : (<CircularProgress />)
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div className="price-block silver">
            <div className="rank-cell">
              2th place
            </div>
            <div className="price-cell">
              {
              previousContests
              && previousContests
              && previousContests.length
                ? (
                  <>
                    <p>
                      {previousContests[page - 1].winner_second ? previousContests[page - 1].winner_second.username : 'n/a'}
                    </p>
                    <p>
                      {previousContests[page - 1].second_place_reward}
                    </p>
                  </>

                )
                : (<CircularProgress />)
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <div className="price-block bronze">
            <div className="rank-cell">
              3th place
            </div>
            <div className="price-cell">
              {
              previousContests
              && previousContests
              && previousContests.length
                ? (
                  <>
                    <p>
                      {previousContests[page - 1].winner_third ? previousContests[page - 1].winner_third.username : 'n/a'}
                    </p>
                    <p>
                      {previousContests[page - 1].third_place_reward}
                    </p>
                  </>

                )
                : (<CircularProgress />)
              }
            </div>
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
        >
          <Pagination
            count={
              previousContests
              && previousContests.length > 0
              && previousContests.length
            }
            color="primary"
            page={page}
            onChange={handleChange}
            style={{ color: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <h3 className="mb15">This week statistics</h3>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ borderBottom: '1px solid black' }}
        >
          <Grid item xs={4}>
            <p>
              Position
            </p>
          </Grid>
          <Grid item xs={4}>
            <p>
              Username
            </p>
          </Grid>
          <Grid item xs={4}>
            <p>
              Collected
            </p>
          </Grid>
        </Grid>

        {
              referralContestStats
              && referralContestStats.data
                ? referralContestStats.data.map((d, i) => (
                  <Grid container item xs={12}>
                    <Grid item xs={4}>
                      <p>
                        {i + 1}
                        {i + 1 === 1 ? 'st' : 'th'}
                      </p>
                    </Grid>
                    <Grid item xs={4}>
                      <p>{d.key}</p>
                    </Grid>
                    <Grid item xs={4}>
                      <p>{d.value}</p>
                    </Grid>
                  </Grid>
                ))
                : (<CircularProgress />)
              }

      </Grid>
    </div>
  )
}

ReferralContestView.propTypes = {
  referralContests: PropTypes.shape({
    data: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  referralContests: state.referralContests,
  referralContestRewards: state.referralContestRewards,
  referralContestStats: state.referralContestStats,
})

export default withRouter(connect(mapStateToProps, actions)(ReferralContestView));
