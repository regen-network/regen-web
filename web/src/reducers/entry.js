import { constants } from "../actions/entry";
import * as moment from 'moment';

const initialState = {
    addModalOpen: false,
    saveModalOpen: false,
    entry: {
        date: moment(),
        type: null,
        species: null
    },
    currentFeature: null
}

const reducerMap = {};

reducerMap[constants.PATCH_NEW_ENTRY] = ({entry, ...state}, { attrs }) => {
    return {...state, entry: {...entry, ...attrs}};
};

reducerMap[constants.OPEN_NEW_ENTRY_MODAL] = (state, _) => {
    return {...state, addModalOpen: true};
};

reducerMap[constants.CLEAR_ENTRY] = (state, _) => {
    let clearedEntry = Object.assign({}, state.entry, {type: null, species: null});
    return {...state, entry: clearedEntry};
};

reducerMap[constants.CLOSE_NEW_ENTRY_MODAL] = (state, _) => {
    let clearedEntry = Object.assign({}, state.entry, {type: null, species: null});
    return {...state, addModalOpen: false, entry: clearedEntry};
};

reducerMap[constants.OPEN_SAVE_ENTRY_MODAL] = (state, { payload }) => {
    const { feature } = payload;
    return {...state, saveModalOpen: true, currentFeature: feature};
};

reducerMap[constants.CLOSE_SAVE_ENTRY_MODAL] = (state, _) => {
    let clearedEntry = Object.assign({}, state.entry, {type: null, species: null});
    return {...state, saveModalOpen: false, entry: clearedEntry};
};

export default (state = initialState, action) => {
	  const fn = reducerMap[action.type];
	  return fn ? fn(state, action) : state;
}
