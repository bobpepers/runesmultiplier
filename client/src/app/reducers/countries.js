import {
  FETCH_COUNTRIES_BEGIN,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_COUNTRIES_FAIL:
      console.log('Error: ', action.error);
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
