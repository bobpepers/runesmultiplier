import {
  POST_BLOCK_BEGIN,
  POST_BLOCK_SUCCESS,
  POST_BLOCK_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_BLOCK_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case POST_BLOCK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case POST_BLOCK_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
