import axios from 'axios';
import {
  FETCH_PAYMENTMETHODS_BEGIN,
  FETCH_PAYMENTMETHODS_SUCCESS,
  FETCH_PAYMENTMETHODS_FAIL,
} from './types/index';

export function fetchPaymentMethodData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_PAYMENTMETHODS_BEGIN,
    });
    axios.get(`${process.env.API_URL}/paymentmethods`)
      .then((response) => {
        dispatch({
          type: FETCH_PAYMENTMETHODS_SUCCESS,
          payload: response.data.paymentMethods,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_PAYMENTMETHODS_FAIL,
          payload: error,
        })
      });
  }
}
