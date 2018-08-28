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

reducerMap[constants.CLOSE_NEW_ENTRY_MODAL] = (state, _) => {
    return {...state, addModalOpen: false};
};

reducerMap[constants.OPEN_SAVE_ENTRY_MODAL] = (state, { payload }) => {
    const { feature } = payload;
    return {...state, saveModalOpen: true, currentFeature: feature};
};

reducerMap[constants.CLOSE_SAVE_ENTRY_MODAL] = (state, _) => {
    return {...state, saveModalOpen: false};
};

export default (state = initialState, action) => {
	  const fn = reducerMap[action.type];
	  return fn ? fn(state, action) : state;
}
