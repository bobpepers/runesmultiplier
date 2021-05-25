import {
  CREATE_FEEDBACK_IDLE,
  CREATE_FEEDBACK_FAIL,
  CREATE_FEEDBACK_BEGIN,
  CREATE_FEEDBACK_SUCCESS,

} from '../actions/types/index';

const initialState = {
  data: 0,
  isFetching: false, // Default to fetching..
  phase: 0,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_IDLE:
      return {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      };
    case CREATE_FEEDBACK_BEGIN:
      return {
        ...state,
        isFetching: true,
        phase: 0,
        error: null,
      };
    case CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        phase: 1,
        isFetching: false,
      };
    case CREATE_FEEDBACK_FAIL:
      console.log('Error: ', action.error);
      return {
        ...state,
        error: action.error,
        phase: 2,
        isFetching: false,
      };
    default:
      return state;
  }
};
