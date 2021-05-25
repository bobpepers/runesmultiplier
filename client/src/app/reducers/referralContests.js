import {
  FETCH_REFERRALCONTESTS_BEGIN,
  FETCH_REFERRALCONTESTS_SUCCESS,
  FETCH_REFERRALCONTESTS_FAIL,
  UPDATE_REFERRALCONTESTS,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REFERRALCONTESTS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_REFERRALCONTESTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_REFERRALCONTESTS_FAIL:
      console.log('Error: ', action.error);
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case UPDATE_REFERRALCONTESTS:
      console.log('payload jackpot: ', action.payload);
      return {
        ...state,
        data: state.data.map((item, index) => {
          if (index !== 0) {
            return item
          }
          return {
            ...item,
            total_tickets: action.payload.total_tickets,
            jackpot_amount: action.payload.jackpot_amount,
          }
        }),
        isFetching: false,
      };
    default:
      return state;
  }
};
