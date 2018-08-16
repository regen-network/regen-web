const UPDATE_FEATURES = "UPDATE_FEATURES";
const updateFeatures = (features) => ({ type: UPDATE_FEATURES, payload: { features }});

const PATCH_NEW_ENTRY = "PATCH_NEW_ENTRY";
const patchNewEntry = (attrs) => ({ type: PATCH_NEW_ENTRY, attrs});

const constants = { UPDATE_FEATURES, PATCH_NEW_ENTRY };
const actions =  { updateFeatures, patchNewEntry };

export { constants, actions };
