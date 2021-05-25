import axios from 'axios';
import {
  FETCH_PHONECODE_BEGIN,
  FETCH_PHONECODE_SUCCESS,
  FETCH_PHONECODE_FAIL,
  VERIFY_PHONECODE_BEGIN,
  VERIFY_PHONECODE_SUCCESS,
  VERIFY_PHONECODE_FAIL,
  VERIFY_PHONECODE_IDLE,
  ENQUEUE_SNACKBAR,
  UPDATE_USER_PHONE,
} from './types/index';

export function getPhoneCode(e) {
  console.log(e);
  return function (dispatch) {
    dispatch({
      type: FETCH_PHONECODE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/getphonecode`, { phonenumber: e })
      .then((response) => {
        dispatch({
          type: FETCH_PHONECODE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: SMS Send',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
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
          type: FETCH_PHONECODE_FAIL,
          payload: error,
        });
      });
  }
}

export function verifyPhoneCode(phoneNumber, verifyCode) {
  return function (dispatch) {
    dispatch({
      type: VERIFY_PHONECODE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/verifyphonecode`, { phoneNumber, verifyCode })
      .then((response) => {
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Verified Phone Number',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        dispatch({
          type: VERIFY_PHONECODE_SUCCESS,
          payload: response.data,
        })
        dispatch({
          type: UPDATE_USER_PHONE,
          payload: response.data,
        })
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
          type: VERIFY_PHONECODE_FAIL,
          payload: error,
        });
      });
  }
}

export function idleVerifyPhoneCode() {
  return function (dispatch) {
    dispatch({
      type: VERIFY_PHONECODE_IDLE,
    });
  }
}
