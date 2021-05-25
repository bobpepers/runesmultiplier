import {
  POST_TRADE_SUCCESS,
  POST_TRADE_BEGIN,
  POST_TRADE_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TRADE_BEGIN:
      return {
        ...state,
        data: [],
        isFetching: true,
        error: null,
      };
    case POST_TRADE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case POST_TRADE_FAIL:
      return {
        ...state,
        data: [],
        error: action.payload.response.data.error,
        isFetching: false,
      };

    default:
      return state;
  }
};
