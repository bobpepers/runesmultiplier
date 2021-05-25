import {
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_LOCATION_SUCCESS:
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');
      console.log('FETCH_PRICE_SUCCESS');

      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_LOCATION_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
