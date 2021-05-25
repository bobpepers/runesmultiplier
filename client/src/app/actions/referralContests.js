import axios from 'axios';
import {
  FETCH_REFERRALCONTESTS_BEGIN,
  FETCH_REFERRALCONTESTS_SUCCESS,
  FETCH_REFERRALCONTESTS_FAIL,
  UPDATE_REFERRALCONTESTS,
  FETCH_REFERRALCONTESTREWARDS_BEGIN,
  FETCH_REFERRALCONTESTREWARDS_SUCCESS,
  FETCH_REFERRALCONTESTREWARDS_FAIL,
  FETCH_REFERRALCONTESTSTATS_BEGIN,
  FETCH_REFERRALCONTESTSTATS_SUCCESS,
  FETCH_REFERRALCONTESTSTATS_FAIL,
} from './types/index';

export function fetchReferralContests() {
  return function (dispatch) {
    dispatch({
      type: FETCH_REFERRALCONTESTS_BEGIN,
    });
    axios.get(`${process.env.API_URL}/referral/contests`)
      .then((response) => {
        // console.log()
        dispatch({
          type: FETCH_REFERRALCONTESTS_SUCCESS,
          payload: response.data.contests,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_REFERRALCONTESTS_FAIL,
          payload: error,
        });
      });
  }
}

export function onUpdateReferralContests(payload) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_REFERRALCONTESTS,
      payload,
    });
  }
}

export function fetchContestRewards() {
  return function (dispatch) {
    dispatch({
      type: FETCH_REFERRALCONTESTREWARDS_BEGIN,
    });
    axios.get(`${process.env.API_URL}/referral/rewards`)
      .then((response) => {
        dispatch({
          type: FETCH_REFERRALCONTESTREWARDS_SUCCESS,
          payload: response.data.rewards,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_REFERRALCONTESTREWARDS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchContestStatstics() {
  return function (dispatch) {
    dispatch({
      type: FETCH_REFERRALCONTESTSTATS_BEGIN,
    });
    axios.get(`${process.env.API_URL}/referral/stats`)
      .then((response) => {
        dispatch({
          type: FETCH_REFERRALCONTESTSTATS_SUCCESS,
          payload: response.data.stats,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_REFERRALCONTESTSTATS_FAIL,
          payload: error,
        });
      });
  }
}
