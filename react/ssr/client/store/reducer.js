import { combineReducers } from 'redux';
import * as ActionType from './actions';

export const searchReducer = (state = { search: { query: '', data: null } }, action) => {
  switch (action.type) {
    case ActionType.UPDATE_SEARCH_DATA:
      return {
        ...state,
        ...action.search,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  search: searchReducer,
});