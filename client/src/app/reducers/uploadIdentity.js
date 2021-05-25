import {
  UPLOAD_IDENTITY_BEGIN,
  UPLOAD_IDENTITY_SUCCESS,
  UPLOAD_IDENTITY_FAIL,
  UPLOAD_IDENTITY_IDLE,
} from '../actions/types/index';

const initialState = {
  data: 0,
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IDENTITY_IDLE:
      return {
        data: 0,
        isFetching: false, // Default to fetching..
        error: null,
      };
    case UPLOAD_IDENTITY_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case UPLOAD_IDENTITY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case UPLOAD_IDENTITY_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
