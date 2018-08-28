import { constants } from "../actions/auth";

let initialState = {
    status: "INIT",
    authenticated: false,
    user: {
      given_name: "guest",
      family_name: "",
      picture: "",
      email: ""
    }
};

const reducerMap = {};

reducerMap[constants.LOGIN_SUCCESS] = (state, { payload }) => {
    const { profile } = payload;
	  return {...state, status: "LOGGED_IN", authenticated: true, user: profile};
};

reducerMap[constants.LOGOUT_SUCCESS] = (state, _) => {
	  return {...state, status: "LOGGED_OUT", authenticated: false, user: {}};
};

export default (state = initialState, action) => {
	const fn = reducerMap[action.type];
	return fn ? fn(state, action) : state;
}
