import axios from 'axios';
import {
  POST_TRUST_BEGIN,
  POST_TRUST_SUCCESS,
  POST_TRUST_FAIL,
  ADD_TRUST,
  DELETE_TRUST,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function trustAction(username) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_TRUST_BEGIN,
      });
      axios.post(`${process.env.API_URL}/trust`, { username })
        .then((response) => {
          if (response.data.removed) {
            dispatch({
              type: DELETE_TRUST,
              payload: response.data.removed,
            });
          }
          if (response.data.trusted) {
            dispatch({
              type: ADD_TRUST,
              payload: response.data.trusted,
            });
          }
          dispatch({
            type: POST_TRUST_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Surf Started',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'success',
              },
            },
          });
          resolve();
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: POST_TRUST_FAIL,
            payload: error,
          });
          if (error.response) {
          // client received an error response (5xx, 4xx)
            console.log(error.response);
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
          resolve();
        });
    });
  }
}
