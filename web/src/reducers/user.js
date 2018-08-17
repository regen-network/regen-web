import { constants } from "../actions/user";

let initialState = {
    given_name: "guest",
    family_name: "",
    picture: "",
    email: ""
};

const reducerMap = {};

reducerMap[constants.UPDATE_USER] = (state, { payload }) => {
    const { user } = payload;
	  return {...state, ...user}
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		return state;
	}
	fn(state, action);
}
