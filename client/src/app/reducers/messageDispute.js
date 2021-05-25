import {
  POST_MESSAGEDISPUTE_BEGIN,
  POST_MESSAGEDISPUTE_SUCCESS,
  POST_MESSAGEDISPUTE_FAIL,
  POST_MESSAGEDISPUTE_IDLE,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_MESSAGEDISPUTE_IDLE:
      return {
        data: [],
        isFetching: true, // Default to fetching..
        error: null,
      };
    case POST_MESSAGEDISPUTE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case POST_MESSAGEDISPUTE_SUCCESS:
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
    case POST_MESSAGEDISPUTE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
