import {
  FETCH_ADMINCOUNTRIES_BEGIN,
  FETCH_ADMINCOUNTRIES_SUCCESS,
  FETCH_ADMINCOUNTRIES_FAIL,
  UPDATE_ADMIN_COUNTRIES,
  ADD_ADMINCOUNTRY,
  UPDATE_ADMINCOUNTRY,
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
    case FETCH_ADMINCOUNTRIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINCOUNTRIES_SUCCESS:
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINCOUNTRIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case UPDATE_ADMIN_COUNTRIES:
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
    case UPDATE_ADMINCOUNTRY:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.map(
            (country) => (country.id === action.payload.id
              ? action.payload
              : country),
          ),
        ],
      };

    case ADD_ADMINCOUNTRY:
      console.log('ADD_ADMINCOUNTRY');
      console.log('ADD_ADMINCOUNTRY');
      console.log('ADD_ADMINCOUNTRY');
      console.log('ADD_ADMINCOUNTRY');
      console.log('ADD_ADMINCOUNTRY');

      console.log('ADD_ADMINCOUNTRY');
      console.log('ADD_ADMINCOUNTRY');
      console.log(state.data);
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: [
          action.payload,
          ...state.data,
        ],
      };

    default:
      return state;
  }
}
