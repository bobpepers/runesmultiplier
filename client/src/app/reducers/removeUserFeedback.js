import {
  REMOVE_FEEDBACK_FAIL,
  REMOVE_FEEDBACK_BEGIN,
  REMOVE_FEEDBACK_SUCCESS,
} from '../actions/types/index';

const initialState = {
  data: 0,
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FEEDBACK_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case REMOVE_FEEDBACK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case REMOVE_FEEDBACK_FAIL:
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
