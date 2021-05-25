import axios from 'axios';
import {
  POST_MESSAGE_BEGIN,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_FAIL,
  POST_MESSAGE_IDLE,
  ADD_MESSAGE,
  ENQUEUE_SNACKBAR,
  INSERT_MESSAGE,
  POST_MESSAGEDISPUTE_BEGIN,
  POST_MESSAGEDISPUTE_SUCCESS,
  POST_MESSAGEDISPUTE_FAIL,
  ADD_MESSAGEDISPUTE,
  INSERT_MESSAGEDISPUTE,
} from './types/index';

export function sendMessageAction(message, id) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_MESSAGE_BEGIN,
      });
      axios.post(`${process.env.API_URL}/message/send`, { message, id })
        .then((response) => {
          // if (response.data.trade) {
          //  dispatch({
          //    type: DELETE_MESSAGE,
          //    payload: response.data.trade,
          //  });
          // }
          dispatch({
            type: POST_MESSAGE_SUCCESS,
            payload: response.data.trade,
          });
          dispatch({
            type: ADD_MESSAGE,
            payload: response.data.trade,
          })
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Message send',
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
            type: POST_MESSAGE_FAIL,
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

export function sendMessageDisputeAction(message, id) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_MESSAGEDISPUTE_BEGIN,
      });
      axios.post(`${process.env.API_URL}/message/dispute/send`, { message, id })
        .then((response) => {
          // if (response.data.trade) {
          //  dispatch({
          //    type: DELETE_MESSAGE,
          //    payload: response.data.trade,
          //  });
          // }
          dispatch({
            type: POST_MESSAGEDISPUTE_SUCCESS,
            payload: response.data.trade,
          });
          dispatch({
            type: ADD_MESSAGEDISPUTE,
            payload: response.data.trade,
          })
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Message send',
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
            type: POST_MESSAGEDISPUTE_FAIL,
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

export function onInsertMessage(data) {
  return function (dispatch) {
    dispatch({
      type: INSERT_MESSAGE,
      payload: data,
    });
  }
}

export function onInsertMessageDispute(data) {
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');
  console.log('data');

  return function (dispatch) {
    dispatch({
      type: INSERT_MESSAGEDISPUTE,
      payload: data,
    });
  }
}
