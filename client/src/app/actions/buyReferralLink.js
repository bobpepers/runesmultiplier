import axios from 'axios';
import {
  BUY_REFERRALLINK_IDLE,
  BUY_REFERRALLINK_BEGIN,
  BUY_REFERRALLINK_SUCCESS,
  BUY_REFERRALLINK_FAIL,
  BUY_REFERRALLINK,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function idleBuyReferralLink() {
  return function (dispatch) {
    dispatch({
      type: BUY_REFERRALLINK_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function executeBuyReferralLink() {
  return function (dispatch) {
    dispatch({
      type: BUY_REFERRALLINK_BEGIN,
    });
    axios.post(`${process.env.API_URL}/referral/buy`)
      .then((response) => {
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Bought Referral Link',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        dispatch({
          type: BUY_REFERRALLINK_SUCCESS,
          payload: response,
        });
        dispatch({
          type: BUY_REFERRALLINK,
          payload: response,
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          if (error.response.status === 429) {
            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: `${error.response.status}: ${error.response.data}`,
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'error',
                },
              },
            });
          } else {
            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: `${error.response.status}: ${error.response.data.error}`,
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'error',
                },
              },
            });
          }
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
        dispatch({
          type: BUY_REFERRALLINK_FAIL,
          payload: error,
        });
      });
  }
}
