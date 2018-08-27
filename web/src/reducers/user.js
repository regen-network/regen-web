import { constants } from "../actions/user";

let initialState = {
    given_name: "guest",
    family_name: "",
    picture: "",
    email: "",
    authenticated: false
};

const reducerMap = {};

reducerMap[constants.UPDATE_USER] = (state, { payload }) => {
    const { user } = payload;
    state.authenticated = true;
	  return {...state, ...user}
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	return fn ? fn(state, action) : state;
}
