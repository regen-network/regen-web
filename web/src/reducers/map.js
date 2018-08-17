import { constants } from "../actions/map";

let initialState = [];

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return features;
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		return state;
	}
	return fn(state, action);
}
