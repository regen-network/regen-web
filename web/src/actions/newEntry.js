const PATCH_NEW_ENTRY = "PATCH_NEW_ENTRY";
const patchNewEntry = (attrs) => ({ type: PATCH_NEW_ENTRY, attrs});

const OPEN_NEW_ENTRY_MODAL= "OPEN_NEW_ENTRY_MODAL";
const openNewEntryModal = () => ({type:OPEN_NEW_ENTRY_MODAL});

const CLOSE_NEW_ENTRY_MODAL= "CLOSE_NEW_ENTRY_MODAL";
const closeNewEntryModal = () => ({type:CLOSE_NEW_ENTRY_MODAL});

const NEW_ENTRY_FOCUS_DATE_PICKER = "NEW_ENTRY_FOCUS_DATE_PICKER";
const focusNewEntryDatePicker = (focus) => ({type:NEW_ENTRY_FOCUS_DATE_PICKER, focus});

const constants = { PATCH_NEW_ENTRY, OPEN_NEW_ENTRY_MODAL, CLOSE_NEW_ENTRY_MODAL, NEW_ENTRY_FOCUS_DATE_PICKER };
const actions =  { patchNewEntry, openNewEntryModal, closeNewEntryModal, focusNewEntryDatePicker };

export { constants, actions };
