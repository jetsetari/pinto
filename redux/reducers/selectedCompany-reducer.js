// import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import * as types from '../actions/action-types';

const initialState = {
  selectedCompany: {}
};

const selectedCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_COMPANY_DATA:
      return { ...state, selectedCompany: action.selectedCompany };
    default:
      return state
  }
};

export default selectedCompanyReducer;