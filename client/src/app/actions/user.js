import axios from 'axios';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  UPDATE_TRANSACTION,
  INSERT_TRANSACTION,
  UPDATE_WALLET,
  UPDATE_WEBSLOT,
  UPDATE_JACKPOT_TICKETS,
  FETCH_SPECIFICUSER_BEGIN,
  FETCH_SPECIFICUSER_FAIL,
  FETCH_SPECIFICUSER_SUCCESS,
  ENQUEUE_SNACKBAR,
  UPDATE_BIO,
  UPDATE_STORESTATUS,
  // UPDATE_PRICE,
} from './types/index';

/**
 * Fetch User Data
 */
export function fetchUserData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/user`)
      .then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_USER_FAIL,
          payload: error,
        });
      });
  }
}

export function onUpdateTransaction(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: data,
    });
  }
}

export function onInsertTransaction(data) {
  return function (dispatch) {
    dispatch({
      type: INSERT_TRANSACTION,
      payload: data,
    });
  }
}

export function onUpdateJackpotTickets(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_JACKPOT_TICKETS,
      payload: data,
    });
  }
}

export function onUpdateWallet(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_WALLET,
      payload: data,
    });
  }
}
export function onUpdateWebslot(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_WEBSLOT,
      payload: data,
    });
  }
}

export function fetchSpecificUserData(user) {
  return function (dispatch) {
    dispatch({
      type: FETCH_SPECIFICUSER_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/getuser`, { user })
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_SPECIFICUSER_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        console.log(error);
        dispatch({
          type: FETCH_SPECIFICUSER_FAIL,
          payload: error,
        });
      });
  }
}

export function changeBioAction(bio) {
  return function (dispatch) {
    return new Promise((resolve) => {
      axios.post(`${process.env.API_URL}/update/bio`, { bio })
        .then((response) => {
          console.log(response);
          dispatch({
            type: UPDATE_BIO,
            payload: response.data,
          });
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Bio Changed',
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

export function changeStoreStatus() {
  return function (dispatch) {
    return new Promise((resolve) => {
      axios.post(`${process.env.API_URL}/update/store/status`)
        .then((response) => {
          console.log(response);
          dispatch({
            type: UPDATE_STORESTATUS,
            payload: response.data.store,
          });
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Store Open/Closed',
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

// export function onUpdatePrice(data) {
//  return function (dispatch) {
//    dispatch({
//      type: UPDATE_PRICE,
//      payload: data,
//    });
//  }
// }
