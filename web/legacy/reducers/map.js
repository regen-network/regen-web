import { constants } from "../actions/map";

let initialState = {
    features: [],
    selected: {},
    zoom: false,
    warningModalOpen: false,
    deletePolygonModalOpen: false,
    uploadModalOpen: false,
    deletedFeature: {},
    uploadError: ""
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

reducerMap[constants.OPEN_DELETE_MODAL] = (state, { payload }) => {
    const { feature } = payload;
    return {...state, deletePolygonModalOpen: true, deletedFeature: feature};
};

reducerMap[constants.CLOSE_DELETE_MODAL] = (state, _) => {
    return {...state, deletePolygonModalOpen: false};
};


reducerMap[constants.OPEN_UPLOAD_MODAL] = (state, _ ) => {
    return {...state, uploadModalOpen: true };
};

reducerMap[constants.CLOSE_UPLOAD_MODAL] = (state, _) => {
    return {...state, uploadModalOpen: false, uploadError: "" };
};

reducerMap[constants.UPDATE_UPLOAD_ERROR] = (state, { payload }) => {
    const { message } = payload;
	  return {...state, uploadError: message};
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	return fn ? fn(state, action) : state;
}
