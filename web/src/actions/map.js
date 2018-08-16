const UPDATE_FEATURES = "UPDATE_FEATURES";
const updateFeatures = (features) => ({ type: UPDATE_FEATURES, payload: { features }});

const OPTIMISTIC_SAVE_FEATURE = "OPTIMISTIC_SAVE_FEATURE";
const optimisticSaveFeature = (id) => ({ type: OPTIMISTIC_SAVE_FEATURE, payload: { id }});

const constants = { UPDATE_FEATURES, OPTIMISTIC_SAVE_FEATURE };
const actions =  { updateFeatures, optimisticSaveFeature };

export { constants, actions };
