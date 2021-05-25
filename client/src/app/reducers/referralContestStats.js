import {
  FETCH_REFERRALCONTESTSTATS_BEGIN,
  FETCH_REFERRALCONTESTSTATS_SUCCESS,
  FETCH_REFERRALCONTESTSTATS_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REFERRALCONTESTSTATS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_REFERRALCONTESTSTATS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_REFERRALCONTESTSTATS_FAIL:
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
