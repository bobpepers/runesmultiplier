import {
  SEND_MASS_MAIL_BEGIN,
  SEND_MASS_MAIL_SUCCESS,
  SEND_MASS_MAIL_FAIL,
  SEND_MASS_MAIL_IDLE,
} from '../../actions/types/index';

const initialState = {
  data: [],
  isFetching: false, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MASS_MAIL_IDLE:
      return {
        data: [],
        isFetching: false, // Default to fetching..
        error: null,
      };
    case SEND_MASS_MAIL_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case SEND_MASS_MAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case SEND_MASS_MAIL_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
