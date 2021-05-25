import {
  DELETE_POSTAD_BEGIN,
  DELETE_POSTAD_SUCCESS,
  DELETE_POSTAD_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POSTAD_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case DELETE_POSTAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case DELETE_POSTAD_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
