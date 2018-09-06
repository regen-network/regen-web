import { constants } from "../actions/map";

let initialState = {
    features: [],
    selected: {},
    zoom: false,
    warningModalOpen: false
};

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return {...state, features};
};

reducerMap[constants.UPDATE_ZOOM] = (state, _) => {
	  return {...state, zoom: true };
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

reducerMap[constants.OPEN_WARNING_MODAL] = (state, _) => {
    return {...state, warningModalOpen: true};
};

reducerMap[constants.CLOSE_WARNING_MODAL] = (state, _) => {
    return {...state, warningModalOpen: false};
};


export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	return fn ? fn(state, action) : state;
}
