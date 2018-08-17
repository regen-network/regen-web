import { constants } from "../actions/map";
import { List } from 'immutable';

let initialState = List();

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return state.merge(List(features));
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		return state;
	}
	return state.merge(fn(state, action));
}
