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
  export const selectProfessional = (selectedProfessional) => dispatch => dispatch({
    type: types.PROFESSIONAL_SELECT,
    payload: selectedProfessional
  });
  export const professionalList = (professionalList) => dispatch => dispatch({
    type: types.PROFESSIONAL_LIST,
    payload: professionalList
  });
  export const selectSlot = (selectedSlot) => dispatch => dispatch({
    type: types.SLOT_SELECT,
    payload: selectedSlot
  });
  export const slotList = (slotList) => dispatch => dispatch({
    type: types.SLOT_LIST,
    payload: slotList
  });
  export const selectStep = (selectedStep) => dispatch => dispatch({
    type: types.STEP_SELECT,
    payload: selectedStep
  });
  export const stepList = (stepList) => dispatch => dispatch({
    type: types.STEP_LIST,
    payload: stepList
  });
  