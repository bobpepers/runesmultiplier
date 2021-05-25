import {
  CANCEL_MAIN_TRADE_BEGIN,
  CANCEL_MAIN_TRADE_SUCCESS,
  CANCEL_MAIN_TRADE_FAIL,
  CANCEL_MAIN_TRADE_IDLE,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_MAIN_TRADE_IDLE:
      return {
        data: [],
        isFetching: false, // Default to fetching..
        error: null,
      };
    case CANCEL_MAIN_TRADE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case CANCEL_MAIN_TRADE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case CANCEL_MAIN_TRADE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
