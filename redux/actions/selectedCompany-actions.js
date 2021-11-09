import * as types from "./action-types";

// Check authentication

export function setSelectedCompany(selectedCompany) {
  return {
      type: types.SET_SELECTED_COMPANY_DATA,
      selectedCompany
  };
}