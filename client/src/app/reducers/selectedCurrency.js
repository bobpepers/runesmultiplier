import {
  SET_SELECTEDCURRENCY_DEFAULT,
  UPDATE_SELECTED_CURRENCY,
} from '../actions/types/index';

const initialState = {
  data: [{ id: 1, currency: 'USD', price: 0 }],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTEDCURRENCY_DEFAULT:
      return {
        ...state,
        data: { id: 1, currency: 'USD', price: 0 },
      };
    case UPDATE_SELECTED_CURRENCY:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
