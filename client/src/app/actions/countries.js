import axios from 'axios';
import {
  FETCH_COUNTRIES_BEGIN,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
} from './types/index';

export function fetchCountriesData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_COUNTRIES_BEGIN,
    });
    axios.get(`${process.env.API_URL}/countries`)
      .then((response) => {
        console.log(response);
        console.log('response countries')
        dispatch({
          type: FETCH_COUNTRIES_SUCCESS,
          payload: response.data.countries,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_COUNTRIES_FAIL,
          payload: error,
        })
      });
  }
}
