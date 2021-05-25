import {
  POST_MESSAGE_BEGIN,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_FAIL,
  POST_MESSAGE_IDLE,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_MESSAGE_IDLE:
      return {
        data: [],
        isFetching: true, // Default to fetching..
        error: null,
      };
    case POST_MESSAGE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case POST_MESSAGE_SUCCESS:
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log('POST_CURRENT_MESSAGE_SUCCESS');
      console.log(action.payload);

      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case POST_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
