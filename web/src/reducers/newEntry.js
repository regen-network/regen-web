import { constants } from "../actions/newEntry";

const initialState = {
    entry: {
        type: null,
        species: null
    }
}

const reducerMap = {};

reducerMap[constants.PATCH_NEW_ENTRY] = ({entry, ...state}, { attrs }) => {
    return {...state, entry: {...entry, ...attrs}};
};

export default (state = initialState, action) => {
	  const fn = reducerMap[action.type];
	  return fn ? fn(state, action) : state;
}
