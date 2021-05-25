import axios from 'axios';
import {
  FETCH_CURRENCIES_BEGIN,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAIL,
} from './types/index';

export function fetchCurrenciesData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_CURRENCIES_BEGIN,
    });
    axios.get(`${process.env.API_URL}/currencies`)
      .then((response) => {
        console.log(response);
        console.log('response currencies')
        dispatch({
          type: FETCH_CURRENCIES_SUCCESS,
          payload: response.data.currencies,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_CURRENCIES_FAIL,
          payload: error,
        })
      });
  }
}
