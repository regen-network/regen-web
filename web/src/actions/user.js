const UPDATE_USER = "UPDATE_USER";
const updateUser = (user) => ({ type: UPDATE_USER, payload: { user }});

const constants = { UPDATE_USER };
const actions =  { updateUser };

export { constants, actions };
