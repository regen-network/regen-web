import { constants } from "../actions/map";
import { Map } from 'immutable';

let initialState = Map({
  features: [],
  selected: {}
});

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return state.merge({features});
};

reducerMap[constants.OPTIMISTIC_SAVE_FEATURE] = (state, { payload }) => {
    const { id } = payload;
    let selected = {};
    let features = state.toJS().features.map((feature) => {
      if (feature.id === id) {
        feature.saved = true;
        selected[id] = true;
      }
      return feature;
    });

	  return state.merge({features, selected});
};

reducerMap[constants.UPDATE_SELECTED] = (state, { payload }) => {
    const { selected } = payload;
	  return state.merge({selected});
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		console.log(`${action.type} not found`)
		return state;
	}
	return state.merge(fn(state, action));
}
