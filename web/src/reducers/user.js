import { constants } from "../actions/user";
import { Map } from "immutable";

let initialState = Map({
    given_name: "guest",
    family_name: "",
    picture: "",
    email: ""
});

const reducerMap = {};

reducerMap[constants.UPDATE_USER] = (state, { payload }) => {
    const { user } = payload;
	  return state.merge( user );
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	if (!fn) {
		console.log(`${action.type} not found`)
		return state;
	}
	return state.merge(fn(state, action));
}
