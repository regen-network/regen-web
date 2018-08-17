import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers';
const combinedReducers = combineReducers(reducers);

let middlewares = [ReduxThunk];

if (process.env.NODE_ENV !== 'production') {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}

const configureStore = (initialState = {}) => {
  const composer = composeWithDevTools;
	const store = composer(applyMiddleware(...middlewares))(createStore)(combinedReducers, initialState);

	return store;
};

const store = configureStore();

export default store;
