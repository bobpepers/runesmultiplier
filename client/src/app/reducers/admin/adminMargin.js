import {
  FETCH_ADMINMARGIN_BEGIN,
  FETCH_ADMINMARGIN_SUCCESS,
  FETCH_ADMINMARGIN_FAIL,
  UPDATE_ADMINMARGIN,
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
    case FETCH_ADMINMARGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINMARGIN_SUCCESS:
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log('FETCH_ADMINMARGIN_SUCCESS');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINMARGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case UPDATE_ADMINMARGIN:
      console.log('UPDATE');
      console.log('UPDATE');
      console.log('UPDATE');
      console.log('UPDATE');
      console.log('UPDATE');
      console.log('UPDATE');
      console.log('UPDATE');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: [action.payload],
      };

    default:
      return state;
  }
}
