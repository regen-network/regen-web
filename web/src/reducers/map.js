import { constants } from "../actions/map";
import { Map } from 'immutable';

let initialState = Map({
  features: [],
  selected: []
});

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
    console.log("features in reducer", features);
	  return state.merge({features});
};

reducerMap[constants.OPTIMISTIC_SAVE_FEATURE] = (state, { payload }) => {
    const { id } = payload;
    let features = state.toJS().features.map((feature) => {
      if (feature.id === id) {
        feature.saved = true;
      }
      return feature;
    });

	  return state.merge({features});
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		console.log(`${action.type} not found`)
		return state;
	}
	return state.merge(fn(state, action));
}
