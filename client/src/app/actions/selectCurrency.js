import {
  SET_SELECTEDCURRENCY_DEFAULT,
  UPDATE_SELECTED_CURRENCY,
} from './types/index';

export function updateSelectedCurrency(obj) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: UPDATE_SELECTED_CURRENCY,
        payload: obj,
      });
    });
  }
}

export function setDefaultSelectedCurrency() {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: SET_SELECTEDCURRENCY_DEFAULT,
      });
    });
  }
}
