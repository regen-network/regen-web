const PATCH_NEW_ENTRY = "PATCH_NEW_ENTRY";
const patchNewEntry = (attrs) => ({ type: PATCH_NEW_ENTRY, attrs});

const constants = { PATCH_NEW_ENTRY };
const actions =  { patchNewEntry };

export { constants, actions };
