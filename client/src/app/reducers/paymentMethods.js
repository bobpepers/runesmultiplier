import {
  FETCH_PAYMENTMETHODS_BEGIN,
  FETCH_PAYMENTMETHODS_SUCCESS,
  FETCH_PAYMENTMETHODS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTMETHODS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_PAYMENTMETHODS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_PAYMENTMETHODS_FAIL:
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
