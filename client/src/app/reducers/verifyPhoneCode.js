import {
  VERIFY_PHONECODE_BEGIN,
  VERIFY_PHONECODE_SUCCESS,
  VERIFY_PHONECODE_FAIL,
  VERIFY_PHONECODE_IDLE,
} from '../actions/types/index';

const initialState = {
  data: 0,
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_PHONECODE_IDLE:
      return {
        data: false,
        isFetching: false,
        error: null,
      };
    case VERIFY_PHONECODE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case VERIFY_PHONECODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case VERIFY_PHONECODE_FAIL:
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
