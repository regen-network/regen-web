const UPDATE_FEATURES = "UPDATE_FEATURES";
const updateFeatures = (features) => ({ type: UPDATE_FEATURES, payload: { features }});

const constants = { UPDATE_FEATURES };
const actions =  { updateFeatures };

export { constants, actions };
