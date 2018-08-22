const PATCH_NEW_ENTRY = "PATCH_NEW_ENTRY";
const patchNewEntry = (attrs) => ({ type: PATCH_NEW_ENTRY, attrs});

const OPEN_NEW_ENTRY_MODAL= "OPEN_NEW_ENTRY_MODAL";
const openNewEntryModal = () => ({type: OPEN_NEW_ENTRY_MODAL});

const CLOSE_NEW_ENTRY_MODAL= "CLOSE_NEW_ENTRY_MODAL";
const closeNewEntryModal = () => ({type: CLOSE_NEW_ENTRY_MODAL});

const OPEN_SAVE_ENTRY_MODAL= "OPEN_SAVE_ENTRY_MODAL";
const openSaveEntryModal = () => ({type: OPEN_SAVE_ENTRY_MODAL});

const CLOSE_SAVE_ENTRY_MODAL= "CLOSE_SAVE_ENTRY_MODAL";
const closeSaveEntryModal = () => ({type: CLOSE_SAVE_ENTRY_MODAL});

const constants = { PATCH_NEW_ENTRY, OPEN_NEW_ENTRY_MODAL, CLOSE_NEW_ENTRY_MODAL, OPEN_SAVE_ENTRY_MODAL, CLOSE_SAVE_ENTRY_MODAL };
const actions =  { patchNewEntry, openNewEntryModal, closeNewEntryModal, openSaveEntryModal, closeSaveEntryModal };

export { constants, actions };
