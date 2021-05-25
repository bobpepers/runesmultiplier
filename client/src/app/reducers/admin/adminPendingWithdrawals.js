import {
  FETCH_ADMINPENDINGWITHDRAWAL_BEGIN,
  FETCH_ADMINPENDINGWITHDRAWAL_SUCCESS,
  FETCH_ADMINPENDINGWITHDRAWAL_FAIL,
  UPDATE_PENDING_WITHDRAW,
} from '../../actions/types/index';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function adminWithdrawalReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_ADMINPENDINGWITHDRAWAL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINPENDINGWITHDRAWAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.withdrawals,
      };

    case FETCH_ADMINPENDINGWITHDRAWAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case UPDATE_PENDING_WITHDRAW:
      console.log(action.payload);
      console.log('update withdrawal reducer');
      return {
        ...state,
        loading: false,
        data: state.data.map((transaction) => (transaction.id === action.payload.id
          ? action.payload
          : transaction)),
      };

    default:
      return state;
  }
}
