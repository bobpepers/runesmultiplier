import {
  BUY_REFERRALLINK_IDLE,
  BUY_REFERRALLINK_BEGIN,
  BUY_REFERRALLINK_SUCCESS,
  BUY_REFERRALLINK_FAIL,
  BUY_REFERRALLINK,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case BUY_REFERRALLINK_IDLE:
      return {
        data: [],
        isFetching: false, // Default to fetching..
        error: null,
      };
    case BUY_REFERRALLINK_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case BUY_REFERRALLINK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case BUY_REFERRALLINK_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
