import { combineReducers } from 'redux'
import * as types from '../Actions/actionTypes'
const defaultState ={
  selectedService:{
  },
  serviceList: [
    {
        title : 'Popular Treatments',
        id : '1-f',
        services : [
            {name:'Power shape 1',id : 1, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 2',id : 2, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 4',id : 4, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 6',id : 6, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },        
        ] 
    },
    {
        title : 'Body Remodelling',
        id : '1-d',
        services : [
            {name:'Reducing fat hip',id : 7, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Reducing Body mass',id : 8, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 6',id : 9, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },        
        ] 
    },
],
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
    case types.SERVICE_LIST:
      return {...state, serviceList: action.payload}
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  booking: bookingReducer,
}

export default combineReducers(reducers)
