import {
  FETCH_REFERRALCONTESTREWARDS_BEGIN,
  FETCH_REFERRALCONTESTREWARDS_SUCCESS,
  FETCH_REFERRALCONTESTREWARDS_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REFERRALCONTESTREWARDS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_REFERRALCONTESTREWARDS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_REFERRALCONTESTREWARDS_FAIL:
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
