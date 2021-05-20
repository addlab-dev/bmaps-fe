import { combineReducers } from 'redux'
import * as types from '../Actions/actionTypes'
const defaultState ={
  selectedService:{
  },
  bookingInfo : {
  },
  slot_value: "",
  sel_service: "",
  staff_id: "",
  questions: [{
    question_id: "",
    question_type: "",
  }],
  answers: [],
  bookingStatus : {

  }
}
// booking REDUCER
const bookingReducer = (state = defaultState,  action) => {
  switch (action.type) {
    case types.SERVICE_SELECT:
      return {...state, selectedService: action.payload}
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  booking: bookingReducer,
}

export default combineReducers(reducers)
