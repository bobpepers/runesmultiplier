import {
  FETCH_ADMINCONTESTREWARD_BEGIN,
  FETCH_ADMINCONTESTREWARD_SUCCESS,
  FETCH_ADMINCONTESTREWARD_FAIL,
  UPDATE_ADMINCONTESTREWARD,
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
    case FETCH_ADMINCONTESTREWARD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINCONTESTREWARD_SUCCESS:
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

    case FETCH_ADMINCONTESTREWARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case UPDATE_ADMINCONTESTREWARD:
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
