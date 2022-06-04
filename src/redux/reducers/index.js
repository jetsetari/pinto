import { combineReducers } from "redux";

// Reducers
import selectedCompanyReducer from "./selectedCompany-reducer";

// Combine Reducers
var rootReducer = combineReducers({
  selectedCompany: selectedCompanyReducer
});

export default rootReducer;
