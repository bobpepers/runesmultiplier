import {
  CREATE_DISPUTE_BEGIN,
  CREATE_DISPUTE_SUCCESS,
  CREATE_DISPUTE_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DISPUTE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case CREATE_DISPUTE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case CREATE_DISPUTE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
