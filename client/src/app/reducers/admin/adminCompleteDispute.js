import {
  COMPLETE_ADMINDISPUTE_BEGIN,
  COMPLETE_ADMINDISPUTE_COMPLETE,
  COMPLETE_ADMINDISPUTE_FAIL,
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
    case COMPLETE_ADMINDISPUTE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case COMPLETE_ADMINDISPUTE_COMPLETE:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case COMPLETE_ADMINDISPUTE_FAIL:
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
