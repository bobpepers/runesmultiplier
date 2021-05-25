import {
  FETCH_PHONECODE_BEGIN,
  FETCH_PHONECODE_SUCCESS,
  FETCH_PHONECODE_FAIL,
  FETCH_PHONECODE_IDLE,
} from '../actions/types/index';

const initialState = {
  data: 0,
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHONECODE_IDLE:
      return {
        data: false,
        isFetching: false,
        error: null,
      };
    case FETCH_PHONECODE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_PHONECODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_PHONECODE_FAIL:
      console.log('ADD_PUBLISHER_FAIL');
      console.log(action.payload);
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
