import {
  POST_TRUST_BEGIN,
  POST_TRUST_SUCCESS,
  POST_TRUST_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TRUST_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case POST_TRUST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case POST_TRUST_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
