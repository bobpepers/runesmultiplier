import {
  FETCH_ADMINPENDINGIDENTITY_BEGIN,
  FETCH_ADMINPENDINGIDENTITY_SUCCESS,
  FETCH_ADMINPENDINGIDENTITY_FAIL,
  REMOVE_ADMINPENDINGIDENTITY,
} from '../../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINPENDINGIDENTITY_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_ADMINPENDINGIDENTITY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_ADMINPENDINGIDENTITY_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    case REMOVE_ADMINPENDINGIDENTITY:
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
