import {
  FETCH_CURRENT_TRADE_BEGIN,
  FETCH_CURRENT_TRADE_SUCCESS,
  FETCH_CURRENT_TRADE_FAIL,
  FETCH_CURRENT_TRADE_IDLE,
  INSERT_MESSAGE,
  UPDATE_CURRENT_TRADE,
  INSERT_MESSAGEDISPUTE,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_TRADE_IDLE:
      return {
        data: [],
        isFetching: true, // Default to fetching..
        error: null,
      };
    case FETCH_CURRENT_TRADE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_CURRENT_TRADE_SUCCESS:
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log('FETCH_CURRENT_TRADE_SUCCESS');
      console.log(action.payload);

      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_CURRENT_TRADE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };

    case INSERT_MESSAGEDISPUTE:
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log('INSERT_MESSAGEDISPUTE');
      console.log(action.payload);
      console.log(action.payload);

      const existsInArrayDISPUTE = state.data.dispute[0].id !== action.payload.message.disputeId;
      if (existsInArrayDISPUTE) {
        return state;
      }

      console.log(action.payload);

      return {
        ...state,
        data: {
          ...state.data,
          dispute: state.data.dispute.map((dispute) => (dispute
            // transform the one with a matching id
            ? {
              ...dispute,
              messagesDispute: [
                ...dispute.messagesDispute,
                action.payload.message,
              ],
            }
            :
            // otherwise return original todo
            {
              ...dispute,
              messagesDispute: [
                ...dispute.messagesDispute,
                action.payload.message,
              ],
            })),
          // messages: [...state.data.messages, action.payload.message],
        },
        isFetching: false,

      };

    case INSERT_MESSAGE:
      const existsInArray = state.data.id !== action.payload.message.tradeId;
      if (existsInArray) {
        return state;
      }
      console.log(action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          messages: [...state.data.messages, action.payload.message],
        },
        isFetching: false,
      };
    case UPDATE_CURRENT_TRADE:
      console.log('UPDATE_CURRENT_TRADE');
      console.log('UPDATE_CURRENT_TRADE');
      console.log('UPDATE_CURRENT_TRADE');
      console.log('UPDATE_CURRENT_TRADE');
      console.log('UPDATE_CURRENT_TRADE');
      console.log('UPDATE_CURRENT_TRADE');
      console.log('UPDATE_CURRENT_TRADE');

      console.log(action.payload.trade);
      const existsInArrayCurrentTrade = state.data.id !== action.payload.id;
      if (existsInArrayCurrentTrade) {
        return state;
      }

      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
