const PATCH_NEW_ENTRY = "PATCH_NEW_ENTRY";
const patchNewEntry = (attrs) => ({ type: PATCH_NEW_ENTRY, attrs});

const OPEN_NEW_ENTRY_MODAL= "OPEN_NEW_ENTRY_MODAL";
const openNewEntryModal = () => ({type: OPEN_NEW_ENTRY_MODAL});

const CLOSE_NEW_ENTRY_MODAL= "CLOSE_NEW_ENTRY_MODAL";
const closeNewEntryModal = () => ({type: CLOSE_NEW_ENTRY_MODAL});

const OPEN_SAVE_ENTRY_MODAL= "OPEN_SAVE_ENTRY_MODAL";
const openSaveEntryModal = (feature) => ({type: OPEN_SAVE_ENTRY_MODAL, payload: { feature }});

const CLOSE_SAVE_ENTRY_MODAL= "CLOSE_SAVE_ENTRY_MODAL";
const closeSaveEntryModal = () => ({type: CLOSE_SAVE_ENTRY_MODAL});

const OPEN_UPLOAD_MODAL= "OPEN_UPLOAD_MODAL";
const openUploadModal = (feature) => ({type: OPEN_UPLOAD_MODAL, payload: { feature }});

const CLOSE_UPLOAD_MODAL= "CLOSE_UPLOAD_MODAL";
const closeUploadModal = () => ({type: CLOSE_UPLOAD_MODAL});


const constants = { PATCH_NEW_ENTRY, OPEN_NEW_ENTRY_MODAL, CLOSE_NEW_ENTRY_MODAL, OPEN_SAVE_ENTRY_MODAL, CLOSE_SAVE_ENTRY_MODAL, OPEN_UPLOAD_MODAL, CLOSE_UPLOAD_MODAL };
const actions =  { patchNewEntry, openNewEntryModal, closeNewEntryModal, openSaveEntryModal, closeSaveEntryModal, openUploadModal, closeUploadModal };

export { constants, actions };
