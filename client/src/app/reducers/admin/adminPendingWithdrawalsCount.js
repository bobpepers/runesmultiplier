import {
  FETCH_ADMINPENDINGWITHDRAWALCOUNT_BEGIN,
  FETCH_ADMINPENDINGWITHDRAWALCOUNT_SUCCESS,
  FETCH_ADMINPENDINGWITHDRAWALCOUNT_FAIL,
} from '../../actions/types/index';

const initialState = {
  data: 0,
  loading: false,
  error: null,
};

export default function adminWithdrawalReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_ADMINPENDINGWITHDRAWALCOUNT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINPENDINGWITHDRAWALCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINPENDINGWITHDRAWALCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    default:
      return state;
  }
}
