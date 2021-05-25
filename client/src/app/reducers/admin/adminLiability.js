import {
  FETCH_ADMINLIABILITY_BEGIN,
  FETCH_ADMINLIABILITY_SUCCESS,
  FETCH_ADMINLIABILITY_FAIL,
} from '../../actions/types/index';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function adminLiabilityReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_ADMINLIABILITY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINLIABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINLIABILITY_FAIL:
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
