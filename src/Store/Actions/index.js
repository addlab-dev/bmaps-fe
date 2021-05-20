import * as types from './actionTypes'

// export const selectCategory = (selected) => ({ type: types.SEARCH_SELECT, payload: selected })
export const selectService = (selectedService) => dispatch => dispatch({
    type: types.SERVICE_SELECT,
    payload: selectedService
  });

  export const serviceList = (serviceList) => dispatch => dispatch({
    type: types.SERVICE_LIST,
    payload: serviceList
  });