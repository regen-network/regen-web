import { constants } from "../actions/map";
import { List } from 'immutable';

const initialState = {
    features: [],
    newEntry: {}
}

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return { ...state, features: [] };
};

reducerMap[constants.PATCH_NEW_ENTRY] = ({newEntry, ...state}, { attrs }) => {
    return {...state, newEntry: {...newEntry, ...attrs}};
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		console.log(`${action.type} not found`)
		return state;
	}
	return fn(state, action);
}
