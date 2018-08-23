import { constants } from "../actions/map";

let initialState = {
  features: [],
  selected: {}
};

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return {...state, features};
};

reducerMap[constants.OPTIMISTIC_SAVE_FEATURE] = (state, { payload }) => {
    const { id, name } = payload;
    let selected = {};
    let features = state.features.map((feature) => {
      if (feature.id === id) {
        feature.saved = true;
        feature.name = name;
        selected[id] = true;
      }
      return feature;
    });

	  return {...state, features, selected};
};

reducerMap[constants.UPDATE_SELECTED] = (state, { payload }) => {
    const { selected } = payload;
	  return {...state, selected};
};


export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	return fn ? fn(state, action) : state;
}
