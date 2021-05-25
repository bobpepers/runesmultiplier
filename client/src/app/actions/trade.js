import axios from 'axios';
import {
  POST_TRADE_BEGIN,
  POST_TRADE_SUCCESS,
  POST_TRADE_FAIL,
  POST_TRADE_IDLE,
  ADD_TRADE,
  DELETE_TRADE,
  ENQUEUE_SNACKBAR,
  FETCH_TRADE_BEGIN,
  FETCH_TRADE_SUCCESS,
  FETCH_TRADE_FAIL,
  POST_TRADE_SECOND_BEGIN,
  POST_TRADE_SECOND_SUCCESS,
  POST_TRADE_SECOND_FAIL,
  POST_TRADE_SECOND_IDLE,
  FETCH_CURRENT_TRADE_BEGIN,
  FETCH_CURRENT_TRADE_SUCCESS,
  FETCH_CURRENT_TRADE_FAIL,
  FETCH_CURRENT_TRADE_IDLE,
  CANCEL_TRADE_BEGIN,
  CANCEL_TRADE_SUCCESS,
  CANCEL_TRADE_FAIL,
  ACCEPT_TRADE_BEGIN,
  ACCEPT_TRADE_SUCCESS,
  ACCEPT_TRADE_FAIL,
  UPDATE_TRADE,
  CANCEL_TRADE_IDLE,
  CANCEL_MAIN_TRADE_BEGIN,
  CANCEL_MAIN_TRADE_SUCCESS,
  CANCEL_MAIN_TRADE_FAIL,
  ACCEPT_MAIN_TRADE_BEGIN,
  ACCEPT_MAIN_TRADE_SUCCESS,
  ACCEPT_MAIN_TRADE_FAIL,
  UPDATE_CURRENT_TRADE,
  CREATE_DISPUTE_BEGIN,
  CREATE_DISPUTE_SUCCESS,
  CREATE_DISPUTE_FAIL,
} from './types/index';

export function startTradeAction(id) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_TRADE_BEGIN,
      });
      axios.post(`${process.env.API_URL}/trade/start`, { id })
        .then((response) => {
          // if (response.data.trade) {
          //  dispatch({
          //    type: DELETE_TRADE,
          //    payload: response.data.trade,
          //  });
          // }
          dispatch({
            type: POST_TRADE_SUCCESS,
            payload: response.data.trade,
          });
          dispatch({
            type: ADD_TRADE,
            payload: response.data.trade,
          })
          dispatch({
            type: FETCH_CURRENT_TRADE_SUCCESS,
            payload: response.data.trade,
          })
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Trade Init',
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
            type: POST_TRADE_FAIL,
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

export function fetchTradeData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade`)
      .then((response) => {
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log(response.data.trade);
        dispatch({
          type: FETCH_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_TRADE_FAIL,
          payload: error,
        })
      });
  }
}

export function tradeSecondStepAction(obj, id) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_TRADE_SECOND_BEGIN,
      });
      axios.post(`${process.env.API_URL}/trade/second`, { obj, id })
        .then((response) => {
          // if (response.data.trade) {
          //  dispatch({
          //    type: DELETE_TRADE,
          //    payload: response.data.trade,
          //  });
          // }
          dispatch({
            type: POST_TRADE_SECOND_SUCCESS,
            payload: response.data.trade,
          });
          dispatch({
            type: FETCH_CURRENT_TRADE_SUCCESS,
            payload: response.data.trade,
          })
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Trade Requested',
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
            type: POST_TRADE_SECOND_FAIL,
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

export function fetchSingleTradeData(id) {
  return function (dispatch) {
    dispatch({
      type: FETCH_CURRENT_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/current`, { id })
      .then((response) => {
        dispatch({
          type: FETCH_CURRENT_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_CURRENT_TRADE_FAIL,
          payload: error,
        })
      });
  }
}

export function cancelTradeAction(id) {
  return function (dispatch) {
    dispatch({
      type: CANCEL_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/cancel`, { id })
      .then((response) => {
        console.log(response.data.trade);

        dispatch({
          type: CANCEL_TRADE_SUCCESS,
          payload: response.data.trade,
        })
        dispatch({
          type: DELETE_TRADE,
          payload: response.data.trade,
        })
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Trade Canceled',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        dispatch({
          type: CANCEL_TRADE_FAIL,
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
      });
  }
}

export function cancelMainTradeAction(id) {
  return function (dispatch) {
    dispatch({
      type: CANCEL_MAIN_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/main/cancel`, { id })
      .then((response) => {
        console.log(response.data.trade);

        dispatch({
          type: CANCEL_MAIN_TRADE_SUCCESS,
          payload: response.data.trade,
        })
        // dispatch({
        //  type: DELETE_TRADE,
        //  payload: response.data.trade,
        // })
      }).catch((error) => {
        dispatch({
          type: CANCEL_MAIN_TRADE_FAIL,
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
      });
  }
}

export function acceptMainTradeAction(id) {
  return function (dispatch) {
    dispatch({
      type: ACCEPT_MAIN_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/main/accept`, { id })
      .then((response) => {
        console.log(response.data.trade);
        dispatch({
          type: ACCEPT_MAIN_TRADE_SUCCESS,
          payload: response.data.trade,
        });
        console.log('response.data.trade');
        console.log(response.data.trade);
        if (response.data.trade.type === 'done') {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Trade Complete',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'success',
              },
            },
          });
        }
      }).catch((error) => {
        dispatch({
          type: ACCEPT_MAIN_TRADE_FAIL,
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
      });
  }
}

export function acceptTradeAction(id) {
  return function (dispatch) {
    dispatch({
      type: ACCEPT_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/accept`, { id })
      .then((response) => {
        console.log(response.data.trade);
        dispatch({
          type: ACCEPT_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: ACCEPT_TRADE_FAIL,
          payload: error,
        })
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
      });
  }
}

export function createDisputeAction(id, subject, reason) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: CREATE_DISPUTE_BEGIN,
      });
      axios.post(`${process.env.API_URL}/trade/dispute`, { id, subject, reason })
        .then((response) => {
          // if (response.data.trade) {
          //  dispatch({
          //    type: DELETE_TRADE,
          //    payload: response.data.trade,
          //  });
          // }
          dispatch({
            type: CREATE_DISPUTE_SUCCESS,
            payload: response.data.trade,
          });
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Trade Requested',
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
            type: CREATE_DISPUTE_FAIL,
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

export function onUpdateTrade(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TRADE,
      payload: data,
    });
  }
}
export function onUpdateCurrentTrade(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CURRENT_TRADE,
      payload: data,
    });
  }
}

export function secondTradeIdleAction() {
  return function (dispatch) {
    dispatch({
      type: POST_TRADE_SECOND_IDLE,
    });
  }
}

export function fetchCurrentTradeIdle() {
  return function (dispatch) {
    dispatch({
      type: FETCH_CURRENT_TRADE_IDLE,
    });
  }
}
export function cancelTradeIdleAction() {
  return function (dispatch) {
    dispatch({
      type: CANCEL_TRADE_IDLE,
    });
  }
}
