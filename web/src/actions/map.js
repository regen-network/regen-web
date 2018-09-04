const UPDATE_FEATURES = "UPDATE_FEATURES";
const updateFeatures = (features) => ({ type: UPDATE_FEATURES, payload: { features }});

const UPDATE_ZOOM = "UPDATE_ZOOM";
const updateZoom = (zoom) => ({ type: UPDATE_ZOOM, payload: { zoom }});

const OPTIMISTIC_SAVE_FEATURE = "OPTIMISTIC_SAVE_FEATURE";
const optimisticSaveFeature = (id, name) => ({ type: OPTIMISTIC_SAVE_FEATURE, payload: { id, name }});

const UPDATE_SELECTED = "UPDATE_SELECTED";
const updateSelected = (selected) => ({ type: UPDATE_SELECTED, payload: { selected }});

const constants = { UPDATE_FEATURES, OPTIMISTIC_SAVE_FEATURE, UPDATE_SELECTED, UPDATE_ZOOM };
const actions =  { updateFeatures, optimisticSaveFeature, updateSelected, updateZoom };

export { constants, actions };
