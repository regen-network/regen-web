import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'

import * as reducers from './reducers';
const combinedReducers = combineReducers(reducers);
const middlewares = [logger, ReduxThunk];

const configureStore = (initialState = {}) => {
  const composer = composeWithDevTools;
	const store = composer(applyMiddleware(...middlewares))(createStore)(combinedReducers, initialState);

	return store;
};

const store = configureStore();

export default store;
