import axios from 'axios';
import {
  FETCH_ADMINWITHDRAWAL_BEGIN,
  FETCH_ADMINWITHDRAWAL_FAIL,
  FETCH_ADMINWITHDRAWAL_SUCCESS,
  FETCH_ADMINUSERLIST_BEGIN,
  FETCH_ADMINUSERLIST_SUCCESS,
  FETCH_ADMINUSERLIST_FAIL,
  ENQUEUE_SNACKBAR,
  FETCH_ADMINUSER_BEGIN,
  FETCH_ADMINUSER_SUCCESS,
  FETCH_ADMINUSER_FAIL,
  FETCH_ADMINPUBLISHERS_BEGIN,
  FETCH_ADMINPUBLISHERS_SUCCESS,
  FETCH_ADMINPUBLISHERS_FAIL,
  FETCH_ADMINBANNERS_BEGIN,
  FETCH_ADMINBANNERS_SUCCESS,
  FETCH_ADMINBANNERS_FAIL,
  FETCH_ADMINREVIEWBANNERS_BEGIN,
  FETCH_ADMINREVIEWBANNERS_SUCCESS,
  FETCH_ADMINREVIEWBANNERS_FAIL,
  FETCH_ADMINREVIEWPUBLISHERS_BEGIN,
  FETCH_ADMINREVIEWPUBLISHERS_SUCCESS,
  FETCH_ADMINREVIEWPUBLISHERS_FAIL,
  REMOVE_REVIEW_BANNER,
  REMOVE_REVIEW_PUBLISHER,
  UPDATE_ADMIN_BANNER,
  UPDATE_ADMIN_PUBLISHER,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_DOMAIN,
  FETCH_ADMINDOMAINS_BEGIN,
  FETCH_ADMINDOMAINS_SUCCESS,
  FETCH_ADMINDOMAINS_FAIL,
  FETCH_ADMINCOUNTRIES_BEGIN,
  FETCH_ADMINCOUNTRIES_SUCCESS,
  FETCH_ADMINCOUNTRIES_FAIL,
  ADD_ADMINCOUNTRIES_BEGIN,
  ADD_ADMINCOUNTRIES_SUCCESS,
  ADD_ADMINCOUNTRIES_FAIL,
  ADD_ADMINCOUNTRY,
  FETCH_ADMINCURRENCIES_BEGIN,
  FETCH_ADMINCURRENCIES_SUCCESS,
  FETCH_ADMINCURRENCIES_FAIL,
  UPDATE_ADMIN_CURRENCIES,
  ADD_ADMINCURRENCY,
  ADD_ADMINCURRENCY_BEGIN,
  ADD_ADMINCURRENCY_SUCCESS,
  ADD_ADMINCURRENCY_FAIL,
  FETCH_ADMINPAYMENTMETHOD_BEGIN,
  FETCH_ADMINPAYMENTMETHOD_SUCCESS,
  FETCH_ADMINPAYMENTMETHOD_FAIL,
  UPDATE_ADMIN_PAYMENTMETHOD,
  ADD_ADMINPAYMENTMETHOD,
  FETCH_ADMINPENDINGIDENTITY_BEGIN,
  FETCH_ADMINPENDINGIDENTITY_SUCCESS,
  FETCH_ADMINPENDINGIDENTITY_FAIL,
  REMOVE_ADMINPENDINGIDENTITY,
  UPDATE_ADMINCURRENCY,
  UPDATE_ADMINCOUNTRY,
  FETCH_ADMINDEPOSITS_BEGIN,
  FETCH_ADMINDEPOSITS_SUCCESS,
  FETCH_ADMINDEPOSITS_FAIL,
  FETCH_ADMINTRADES_BEGIN,
  FETCH_ADMINTRADES_SUCCESS,
  FETCH_ADMINTRADES_FAIL,
  FETCH_ADMINPENDINGWITHDRAWAL_BEGIN,
  FETCH_ADMINPENDINGWITHDRAWAL_SUCCESS,
  FETCH_ADMINPENDINGWITHDRAWAL_FAIL,
  FETCH_ADMINSINGLETRADE_BEGIN,
  FETCH_ADMINSINGLETRADE_SUCCESS,
  FETCH_ADMINSINGLETRADE_FAIL,
  COMPLETE_ADMINDISPUTE_BEGIN,
  COMPLETE_ADMINDISPUTE_COMPLETE,
  COMPLETE_ADMINDISPUTE_FAIL,
  UPDATE_CURRENT_TRADE,
  FETCH_ADMINPENDINGDISPUTE_BEGIN,
  FETCH_ADMINPENDINGDISPUTE_SUCCESS,
  FETCH_ADMINPENDINGDISPUTE_FAIL,
  REMOVE_ADMINPENDINGDISPUTE,
  FETCH_ADMINMARGIN_BEGIN,
  FETCH_ADMINMARGIN_SUCCESS,
  FETCH_ADMINMARGIN_FAIL,
  UPDATE_ADMINMARGIN,
  SEND_MASS_MAIL_BEGIN,
  SEND_MASS_MAIL_SUCCESS,
  SEND_MASS_MAIL_FAIL,
  SEND_MASS_MAIL_IDLE,
  FETCH_ADMINCONTESTREWARD_BEGIN,
  FETCH_ADMINCONTESTREWARD_SUCCESS,
  FETCH_ADMINCONTESTREWARD_FAIL,
  UPDATE_ADMINCONTESTREWARD,
  FETCH_ADMINNODEBALANCE_BEGIN,
  FETCH_ADMINNODEBALANCE_SUCCESS,
  FETCH_ADMINNODEBALANCE_FAIL,
  FETCH_ADMINLIABILITY_BEGIN,
  FETCH_ADMINLIABILITY_SUCCESS,
  FETCH_ADMINLIABILITY_FAIL,
} from './types/index';

export function adminRejectIdentity(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/identity/reject`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ADMINPENDINGIDENTITY,
          payload: response.data.identity,
        })
      }).catch((error) => {
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
export function adminAcceptIdentity(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/identity/accept`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ADMINPENDINGIDENTITY,
          payload: response.data.identity,
        })
      }).catch((error) => {
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

export function fetchAdminSingleTradeData(id) {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINSINGLETRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/admin/trade/current`, { id })
      .then((response) => {
        dispatch({
          type: FETCH_ADMINSINGLETRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINSINGLETRADE_FAIL,
          payload: error,
        })
      });
  }
}

export function fetchAdminPendingIdentityData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPENDINGIDENTITY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/identity/pending`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINPENDINGIDENTITY_SUCCESS,
          payload: response.data.users,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPENDINGIDENTITY_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Fetch Withdrawal Data
 */
export function fetchAdminPendingWithdrawalData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPENDINGWITHDRAWAL_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/withdrawals/pending`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINPENDINGWITHDRAWAL_SUCCESS,
          payload: response.data,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPENDINGWITHDRAWAL_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Fetch Pending Disputes Data
 */
export function fetchAdminPendingDisputesData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPENDINGDISPUTE_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/disputes/pending`)
      .then((response) => {
        console.log(response.data)
        dispatch({
          type: FETCH_ADMINPENDINGDISPUTE_SUCCESS,
          payload: response.data.disputes,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPENDINGDISPUTE_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Fetch Withdrawal Data
 */
export function fetchAdminWithdrawalData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINWITHDRAWAL_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/withdrawals`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINWITHDRAWAL_SUCCESS,
          payload: response.data,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINWITHDRAWAL_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Fetch Withdrawal Data
 */
export function fetchAdminUserListData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINUSERLIST_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/userlist`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINUSERLIST_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINUSERLIST_FAIL,
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

/**
 * Fetch admin user Data
 */
export function fetchAdminUserData(obj) {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINUSER_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/user`, obj)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINUSER_SUCCESS,
          payload: response.data,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINUSER_FAIL,
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

/**
 * Fetch admin user Data
 */
export function fetchAdminPublishersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPUBLISHERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/publishers/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINPUBLISHERS_SUCCESS,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPUBLISHERS_FAIL,
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

/**
 * Fetch admin user Data
 */
export function fetchAdminBannersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINBANNERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/banners/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINBANNERS_SUCCESS,
          payload: response.data.banners,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINBANNERS_FAIL,
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

/**
 * Fetch admin user Data
 */
export function fetchAdminReviewBannersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINREVIEWBANNERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/banners/review`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINREVIEWBANNERS_SUCCESS,
          payload: response.data.banners,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINREVIEWBANNERS_FAIL,
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

/**
 * Fetch admin user Data
 */
export function fetchAdminReviewPublishersData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINREVIEWPUBLISHERS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/publishers/review`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINREVIEWPUBLISHERS_SUCCESS,
          payload: response.data.publishers,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINREVIEWPUBLISHERS_FAIL,
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

export function acceptReviewBanner(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/banners/review/accept`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_REVIEW_BANNER,
          payload: response.data.banners,
        })
      }).catch((error) => {
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

export function rejectReviewBanner(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/banners/review/reject`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_REVIEW_BANNER,
          payload: response.data.banners,
        })
      }).catch((error) => {
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

export function rejectReviewPublisher(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/publishers/review/reject`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_REVIEW_PUBLISHER,
          payload: response.data.publishers,
        })
      }).catch((error) => {
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

export function acceptReviewPublisher(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/publishers/review/accept`, { id })
      .then((response) => {
        console.log(response);
        dispatch({
          type: REMOVE_REVIEW_PUBLISHER,
          payload: response.data.publishers,
        })
      }).catch((error) => {
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

export function banAdminBanner(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/banners/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_BANNER,
          payload: response.data.banners,
        })
      }).catch((error) => {
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

export function banAdminPublisher(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/publishers/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_PUBLISHER,
          payload: response.data.publishers,
        })
      }).catch((error) => {
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

export function banAdminUser(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/users/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_USER,
          payload: response.data.users,
        })
      }).catch((error) => {
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

export function banAdminDomain(id) {
  return function (dispatch) {
    axios.post(`${process.env.API_URL}/admin/domains/ban`, { id })
      .then((response) => {
        dispatch({
          type: UPDATE_ADMIN_DOMAIN,
          payload: response.data.domains,
        })
      }).catch((error) => {
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

/**
 * Fetch Withdrawal Data
 */

export function fetchAdminDomains() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINDOMAINS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/domains/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINDOMAINS_SUCCESS,
          payload: response.data.domains,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINDOMAINS_FAIL,
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

export function fetchAdminCountryData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINCOUNTRIES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/countries/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINCOUNTRIES_SUCCESS,
          payload: response.data.countries,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINCOUNTRIES_FAIL,
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

export function addAdminCountry(obj) {
  return function (dispatch) {
    dispatch({
      type: ADD_ADMINCOUNTRIES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/countries/add`, obj)
      .then((response) => {
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log('country added');
        console.log(response.data.country);
        dispatch({
          type: ADD_ADMINCOUNTRIES_SUCCESS,
          payload: response.data.country,
        });
        dispatch({
          type: ADD_ADMINCOUNTRY,
          payload: response.data.country,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added country',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        dispatch({
          type: ADD_ADMINCOUNTRIES_FAIL,
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

export function fetchAdminCurrencyData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINCURRENCIES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/currencies/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINCURRENCIES_SUCCESS,
          payload: response.data.currencies,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINCURRENCIES_FAIL,
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

export function addAdminCurrency(obj) {
  return function (dispatch) {
    dispatch({
      type: ADD_ADMINCURRENCY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/currencies/add`, obj)
      .then((response) => {
        console.log(response.data.currencies);
        dispatch({
          type: ADD_ADMINCURRENCY,
          payload: response.data.currencies,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added currency',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        dispatch({
          type: ADD_ADMINCURRENCY_FAIL,
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

export function fetchAdminTradesData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINTRADES_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/trades/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINTRADES_SUCCESS,
          payload: response.data.trades,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINTRADES_FAIL,
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

export function fetchAdminDepositsData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINDEPOSITS_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/deposits/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINDEPOSITS_SUCCESS,
          payload: response.data.deposits,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINDEPOSITS_FAIL,
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

export function fetchAdminPaymentMethodData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPAYMENTMETHOD_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/paymentmethod/all`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINPAYMENTMETHOD_SUCCESS,
          payload: response.data.paymentMethod,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPAYMENTMETHOD_FAIL,
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

export function updateCountry(id, name, iso, currency) {
  return function (dispatch) {
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    console.log(id);
    console.log(name);
    console.log(iso);
    axios.post(`${process.env.API_URL}/admin/country/update`, {
      id, name, iso, currency,
    })
      .then((response) => {
        console.log('response.data.currency');
        console.log(response.data.country);
        dispatch({
          type: UPDATE_ADMINCOUNTRY,
          payload: response.data.country,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: update country',
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

export function updateMargin(id, margin) {
  return function (dispatch) {
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    console.log(id);
    console.log(margin);
    axios.post(`${process.env.API_URL}/admin/margin/update`, { id, margin })
      .then((response) => {
        console.log('response.data.margin');
        console.log(response.data.margin);
        console.log('response.data.margin');
        console.log(response.data.margin);
        console.log('response.data.margin');
        console.log(response.data.margin);
        console.log('response.data.margin');
        console.log(response.data.margin);
        console.log('response.data.margin');
        console.log(response.data.margin);
        dispatch({
          type: UPDATE_ADMINMARGIN,
          payload: response.data.margin,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: update margin',
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

export function updateAdminContestRewards(
  id,
  firstPlace,
  secondPlace,
  thirdPlace,
  firstPlaceNext,
  secondPlaceNext,
  thirdPlaceNext,
) {
  return function (dispatch) {
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/contestrewards/update`, {
      id,
      firstPlace,
      secondPlace,
      thirdPlace,
      firstPlaceNext,
      secondPlaceNext,
      thirdPlaceNext,
    })
      .then((response) => {
        console.log('response.data.rewards');
        console.log(response.data.rewards);

        dispatch({
          type: UPDATE_ADMINCONTESTREWARD,
          payload: response.data.rewards,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: update margin',
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

export function updateCurrency(id, name, iso) {
  return function (dispatch) {
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    console.log(id);
    console.log(name);
    console.log(iso);
    axios.post(`${process.env.API_URL}/admin/currency/update`, { id, name, iso })
      .then((response) => {
        console.log('response.data.currency');
        console.log(response.data.currency);
        dispatch({
          type: UPDATE_ADMINCURRENCY,
          payload: response.data.currency,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: update currency',
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

export function addAdminPaymentMethod(obj) {
  return function (dispatch) {
    dispatch({
      type: ADD_ADMINCURRENCY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/paymentmethod/add`, obj)
      .then((response) => {
        console.log('response.data.paymentMethod');
        console.log(response.data.paymentMethod);
        dispatch({
          type: ADD_ADMINPAYMENTMETHOD,
          payload: response.data.paymentMethod,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: added paymentMethod',
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

export function adminCompleteDisputeAction(id, conclusion, side) {
  return function (dispatch) {
    dispatch({
      type: COMPLETE_ADMINDISPUTE_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/admin/dispute/complete`, { id, conclusion, side })
      .then((response) => {
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');
        console.log('response.data.trade /admin/dispute/complete');

        console.log(response.data.trade);
        dispatch({
          type: COMPLETE_ADMINDISPUTE_COMPLETE,
          payload: response.data.trade,
        });
        dispatch({
          type: UPDATE_CURRENT_TRADE,
          payload: response.data.trade,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Dispute Settled',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        dispatch({
          type: COMPLETE_ADMINDISPUTE_FAIL,
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

export function fetchAdminMarginData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINMARGIN_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/margin`)
      .then((response) => {
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);
        console.log(response.data.margin);

        dispatch({
          type: FETCH_ADMINMARGIN_SUCCESS,
          payload: response.data.margin,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINMARGIN_FAIL,
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

export function idleSendMassMailAction() {
  return function (dispatch) {
    dispatch({
      type: SEND_MASS_MAIL_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function sendMassMailAction(obj) {
  return function (dispatch) {
    dispatch({
      type: SEND_MASS_MAIL_BEGIN,
    });
    axios.post(`${process.env.API_URL}/admin/massmail/send`, obj)
      .then((response) => {
        console.log('response');
        console.log('response');
        console.log('response');
        console.log('response');
        console.log(response.data.mail);
        dispatch({
          type: SEND_MASS_MAIL_SUCCESS,
          payload: response.data.mail,
        })
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Mass mail send',
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
          type: SEND_MASS_MAIL_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchAdminContestRewardData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINCONTESTREWARD_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/contestrewards`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINCONTESTREWARD_SUCCESS,
          payload: response.data.rewards,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINCONTESTREWARD_FAIL,
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

export function fetchAdminLiabilityData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINLIABILITY_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/liability`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINLIABILITY_SUCCESS,
          payload: response.data.liability,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINLIABILITY_FAIL,
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

export function fetchAdminNodeBalanceData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINNODEBALANCE_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/admin/node/balance`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINNODEBALANCE_SUCCESS,
          payload: response.data.balance,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINNODEBALANCE_FAIL,
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
