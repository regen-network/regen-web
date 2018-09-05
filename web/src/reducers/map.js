import { constants } from "../actions/map";

let initialState = {
  features: [],
  unsavedFeatures: [],
  selected: {},
  warningModalOpen: false
};

const reducerMap = {};

reducerMap[constants.UPDATE_FEATURES] = (state, { payload }) => {
    const { features } = payload;
	  return {...state, features};
};

reducerMap[constants.UPDATE_UNSAVED_FEATURES] = (state, { payload }) => {
    const { unsavedFeatures } = payload;
	  return {...state, unsavedFeatures};
};

reducerMap[constants.OPTIMISTIC_SAVE_FEATURE] = (state, { payload }) => {
    const { newFeature, name } = payload;
    let featureIdentified = false;
    let unsavedFeatures = state.unsavedFeatures;
    let selected = {};
    let features = state.features.map((feature) => {
      if (feature.id === newFeature.id) {
        feature.saved = true;
        feature.name = name;
        featureIdentified = true;
      }
      return feature;
    });

    if (!featureIdentified) {
      unsavedFeatures = state.unsavedFeatures.filter((feature) => {
        return feature.id !== newFeature.id;
      });

      features.push(Object.assign({}, newFeature, {saved: true, name: name}));
    }

    selected[newFeature.id] = true;

	  return {...state, features, selected, unsavedFeatures};
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
