import {
  FETCH_POSTAD_FAIL,
  FETCH_POSTAD_SUCCESS,
  FETCH_POSTAD_BEGIN,
} from '../actions/types/index';

const initialState = {
  buy: [],
  sell: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTAD_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_POSTAD_SUCCESS:
      if (action.payload.buy) {
        return {
          ...state,
          buy: action.payload.buy,
          sell: state.sell,
          isFetching: false,
        };
      }
      if (action.payload.sell) {
        return {
          ...state,
          buy: state.buy,
          sell: action.payload.sell,
          isFetching: false,
        };
      }
      break;
    case FETCH_POSTAD_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
