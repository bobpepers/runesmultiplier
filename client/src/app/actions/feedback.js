import axios from 'axios';
import {
  CREATE_FEEDBACK_FAIL,
  CREATE_FEEDBACK_BEGIN,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_IDLE,
  ENQUEUE_SNACKBAR,
  UPDATE_FEEDBACK_USER,
  REMOVE_FEEDBACK_FAIL,
  REMOVE_FEEDBACK_BEGIN,
  REMOVE_FEEDBACK_SUCCESS,
  REMOVE_FEEDBACK_USER,
} from './types/index';

/**
 * Fetch all users
 */
export function removeUserFeedBackAction(username) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_FEEDBACK_BEGIN,
    });
    axios.post(`${process.env.API_URL}/user/feedback/remove`, {
      username,
    }).then((response) => {
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');

      console.log(response);
      dispatch({
        type: REMOVE_FEEDBACK_SUCCESS,
        payload: response.data.removed,
      });
      dispatch({
        type: REMOVE_FEEDBACK_USER,
        payload: response.data.removed,
      });

      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Removed Rating',
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
        type: REMOVE_FEEDBACK_FAIL,
        payload: error,
      });
    });
  }
}

/**
 * Fetch all users
 */
export function addUserFeedBack(feedback, stars, username) {
  return function (dispatch) {
    dispatch({
      type: CREATE_FEEDBACK_BEGIN,
    });
    axios.post(`${process.env.API_URL}/user/feedback/update`, {
      feedback,
      stars,
      username,
    }).then((response) => {
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');

      console.log(response);
      dispatch({
        type: CREATE_FEEDBACK_SUCCESS,
        payload: response.data.rating,
      });
      dispatch({
        type: UPDATE_FEEDBACK_USER,
        payload: response.data.rating,
      });

      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Update Rating',
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
        type: CREATE_FEEDBACK_FAIL,
        payload: error,
      });
    });
  }
}

export function idleCreateUserFeedback() {
  return function (dispatch) {
    dispatch({
      type: CREATE_FEEDBACK_IDLE,
      // payload: response.data,
    });
  }
}

export function fetchAllFeedback() {
  return function (dispatch) {
    dispatch({
      type: CREATE_FEEDBACK_IDLE,
      // payload: response.data,
    });
  }
}

export function fetchAverageUserRating(username) {
  return function (dispatch) {
    dispatch({
      type: CREATE_FEEDBACK_BEGIN,
    });
    axios.post(`${process.env.API_URL}/user/rating/average`, {
      username,
    }).then((response) => {
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');
      console.log('/user/feedback/update');

      console.log(response);
      dispatch({
        type: CREATE_FEEDBACK_SUCCESS,
        payload: response.data.rating,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Update Rating',
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
        type: CREATE_FEEDBACK_FAIL,
        payload: error,
      });
    });
  }
}
