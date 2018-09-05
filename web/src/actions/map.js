const UPDATE_FEATURES = "UPDATE_FEATURES";
const updateFeatures = (features) => ({ type: UPDATE_FEATURES, payload: { features }});

const OPTIMISTIC_SAVE_FEATURE = "OPTIMISTIC_SAVE_FEATURE";
const optimisticSaveFeature = (id, name) => ({ type: OPTIMISTIC_SAVE_FEATURE, payload: { id, name }});

const UPDATE_SELECTED = "UPDATE_SELECTED";
const updateSelected = (selected) => ({ type: UPDATE_SELECTED, payload: { selected }});

const OPEN_WARNING_MODAL = "OPEN_WARNING_MODAL";
const openWarningModal = () => ({type: OPEN_WARNING_MODAL});

const CLOSE_WARNING_MODAL = "CLOSE_WARNING_MODAL";
const closeWarningModal = () => ({type: CLOSE_WARNING_MODAL});

const constants = { UPDATE_FEATURES, OPTIMISTIC_SAVE_FEATURE, UPDATE_SELECTED, OPEN_WARNING_MODAL, CLOSE_WARNING_MODAL };
const actions =  { updateFeatures, optimisticSaveFeature, updateSelected, openWarningModal, closeWarningModal };

export { constants, actions };
