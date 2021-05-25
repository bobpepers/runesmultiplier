import axios from 'axios';
import {
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAIL,
} from './types/index';

export function setLocation(obj) {
  return function (dispatch) {
    dispatch({
      type: FETCH_LOCATION_BEGIN,
    });
    axios.post(`${process.env.API_URL}/user/location`, obj)
      .then((response) => {
        console.log(response);
        console.log('response countries')
        dispatch({
          type: FETCH_LOCATION_SUCCESS,
          payload: response.data.location,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_LOCATION_FAIL,
          payload: error,
        })
      });
  }
}
