import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { rootReducer } from './reducer';

const enhancer = applyMiddleware(thunk);

export function createServerStore() {
  return createStore(rootReducer, enhancer);
}


export function createClientStore() {
  const initState = typeof window !== 'undefined' ? window.__PRELOAD_STATE__ : null;
  return createStore(rootReducer, initState, enhancer);
}