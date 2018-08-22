import { constants } from "../actions/newEntry";

const initialState = {
    open: false,
    datePickerFocus: false,
    entry: {
        date: null,
        type: null,
        species: null
    }
}

const reducerMap = {};

reducerMap[constants.PATCH_NEW_ENTRY] = ({entry, ...state}, { attrs }) => {
    return {...state, entry: {...entry, ...attrs}};
};

reducerMap[constants.OPEN_NEW_ENTRY_MODAL] = (state, _) => {
    return {...state, open: true};
};

reducerMap[constants.CLOSE_NEW_ENTRY_MODAL] = (state, _) => {
    return {...state, open: false};
};

reducerMap[constants.NEW_ENTRY_FOCUS_DATE_PICKER] = (state, { focused }) => {
    return {...state, datePickerFocus: focused};
};

export default (state = initialState, action) => {
	  const fn = reducerMap[action.type];
	  return fn ? fn(state, action) : state;
}
