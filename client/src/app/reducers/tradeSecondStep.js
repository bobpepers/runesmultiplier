import {
  POST_TRADE_SECOND_BEGIN,
  POST_TRADE_SECOND_SUCCESS,
  POST_TRADE_SECOND_FAIL,
  POST_TRADE_SECOND_IDLE,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TRADE_SECOND_IDLE:
      return {
        data: [],
        isFetching: false, // Default to fetching..
        error: null,
      };
    case POST_TRADE_SECOND_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case POST_TRADE_SECOND_SUCCESS:
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case POST_TRADE_SECOND_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
