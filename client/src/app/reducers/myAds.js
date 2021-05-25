import {
  FETCH_MYPOSTAD_BEGIN,
  FETCH_MYPOSTAD_SUCCESS,
  FETCH_MYPOSTAD_FAIL,
  DELETE_MYPOSTAD,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MYPOSTAD_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_MYPOSTAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_MYPOSTAD_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    case DELETE_MYPOSTAD:
      return {
        ...state,
        data: state.data.filter((ad) => ad.id !== action.payload.id),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
