const UPDATE_FEATURES = "UPDATE_FEATURES";
const updateFeatures = (features) => ({ type: UPDATE_FEATURES, payload: { features }});

const UPDATE_ZOOM = "UPDATE_ZOOM";
const updateZoom = () => ({ type: UPDATE_ZOOM });

const OPTIMISTIC_SAVE_FEATURE = "OPTIMISTIC_SAVE_FEATURE";
const optimisticSaveFeature = (id, name) => ({ type: OPTIMISTIC_SAVE_FEATURE, payload: { id, name }});

const UPDATE_SELECTED = "UPDATE_SELECTED";
const updateSelected = (selected) => ({type: UPDATE_SELECTED, payload: { selected }});

const OPEN_WARNING_MODAL = "OPEN_WARNING_MODAL";
const openWarningModal = () => ({type: OPEN_WARNING_MODAL});

const CLOSE_WARNING_MODAL = "CLOSE_WARNING_MODAL";
const closeWarningModal = () => ({type: CLOSE_WARNING_MODAL});

const OPEN_DELETE_MODAL = "OPEN_DELETE_MODAL";
const openDeleteModal = (feature) => ({type: OPEN_DELETE_MODAL, payload: { feature }});

const CLOSE_DELETE_MODAL = "CLOSE_DELETE_MODAL";
const closeDeleteModal = () => ({type: CLOSE_DELETE_MODAL});

const OPEN_UPLOAD_MODAL = "OPEN_UPLOAD_MODAL";
const openUploadModal = () => ({type: OPEN_UPLOAD_MODAL});

const CLOSE_UPLOAD_MODAL = "CLOSE_UPLOAD_MODAL";
const closeUploadModal = () => ({type: CLOSE_UPLOAD_MODAL});

const UPDATE_UPLOAD_ERROR = "UPDATE_UPLOAD_ERROR";
const updateUploadError = (message) => ({type: UPDATE_UPLOAD_ERROR, payload: { message }});

const UPLOAD_KMZ = "UPLOAD_KMZ";
const uploadKMZ = (data) => {
	return (dispatch) => {
		return fetch(`/api/upload`, {
			credentials: 'same-origin',
      method: 'POST',
      body: data,
		})
		.then((res) => res.json())
		.then((resData) => {
			if (resData.status === 200) {
				return dispatch(closeUploadModal());
			}
			return dispatch(updateUploadError(resData.message));
		})
    .catch((error) => {
      console.log("Catch Upload Err", error);
		});
	};
};


const constants = { UPDATE_FEATURES, OPTIMISTIC_SAVE_FEATURE, UPDATE_SELECTED, OPEN_WARNING_MODAL, CLOSE_WARNING_MODAL, UPDATE_ZOOM, OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL, OPEN_UPLOAD_MODAL, CLOSE_UPLOAD_MODAL, UPLOAD_KMZ, UPDATE_UPLOAD_ERROR};
const actions =  { updateFeatures, optimisticSaveFeature, updateSelected, openWarningModal, closeWarningModal, updateZoom, openDeleteModal, closeDeleteModal, openUploadModal, closeUploadModal, uploadKMZ, updateUploadError };

export { constants, actions };
