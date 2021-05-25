import axios from 'axios';
import {
  UPLOAD_IDENTITY_BEGIN,
  UPLOAD_IDENTITY_SUCCESS,
  UPLOAD_IDENTITY_FAIL,
  UPLOAD_IDENTITY_IDLE,
  UPDATE_USER_IDENTITY,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function uploadIdentity(data) {
  const formData = new FormData();
  formData.append('front', data.front);
  formData.append('back', data.back);
  formData.append('selfie', data.selfie);
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  }

  return function (dispatch) {
    dispatch({
      type: UPLOAD_IDENTITY_BEGIN,
    });
    axios.post(`${process.env.API_URL}/upload/identity`, formData, config)
      .then((response) => {
        dispatch({
          type: UPLOAD_IDENTITY_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: UPDATE_USER_IDENTITY,
          payload: response.data,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Identity Upload',
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
          type: UPLOAD_IDENTITY_FAIL,
          payload: error,
        });
      });
  }
}

export function idleUploadIdentity() {
  return function (dispatch) {
    dispatch({
      type: UPLOAD_IDENTITY_IDLE,
    });
  }
}
