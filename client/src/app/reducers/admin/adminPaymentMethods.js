import {
  FETCH_ADMINPAYMENTMETHOD_BEGIN,
  FETCH_ADMINPAYMENTMETHOD_SUCCESS,
  FETCH_ADMINPAYMENTMETHOD_FAIL,
  UPDATE_ADMIN_PAYMENTMETHOD,
  ADD_ADMINPAYMENTMETHOD,
} from '../../actions/types/index';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function adminPublishersReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_ADMINPAYMENTMETHOD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINPAYMENTMETHOD_SUCCESS:
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINPAYMENTMETHOD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case UPDATE_ADMIN_PAYMENTMETHOD:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.map(
            (publisher) => (publisher.id === action.payload.id
              ? action.payload
              : publisher),
          ),
        ],
      };
    case ADD_ADMINPAYMENTMETHOD:
      return {
        ...state,
        loading: false,
        data: [
          ...action.payload,
          ...state.data,
        ],
      };

    default:
      return state;
  }
}
