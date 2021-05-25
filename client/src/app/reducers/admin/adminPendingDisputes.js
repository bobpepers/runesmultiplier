import {
  FETCH_ADMINPENDINGDISPUTE_BEGIN,
  FETCH_ADMINPENDINGDISPUTE_SUCCESS,
  FETCH_ADMINPENDINGDISPUTE_FAIL,
  REMOVE_ADMINPENDINGDISPUTE,
} from '../../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINPENDINGDISPUTE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_ADMINPENDINGDISPUTE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_ADMINPENDINGDISPUTE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    case REMOVE_ADMINPENDINGDISPUTE:
      return {
        ...state,
        data: state.data.filter((user) => user.id !== action.payload.id),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
