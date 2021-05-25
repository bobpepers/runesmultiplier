import {
  FETCH_ADMINPENDINGDISPUTECOUNT_BEGIN,
  FETCH_ADMINPENDINGDISPUTECOUNT_SUCCESS,
  FETCH_ADMINPENDINGDISPUTECOUNT_FAIL,
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
    case FETCH_ADMINPENDINGDISPUTECOUNT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINPENDINGDISPUTECOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINPENDINGDISPUTECOUNT_FAIL:
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
