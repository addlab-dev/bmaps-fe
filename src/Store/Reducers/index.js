import {
  combineReducers
} from 'redux'
import * as types from '../Actions/actionTypes'
const defaultState = {
  storeID:"",
  selectedService: {},
  serviceList: [],
  professionalList: [
  ],
  stepList: [{
      name: 'Step 1',
      href: '#',
      status: 'complete'
    },
    {
      name: 'Step 2',
      href: '#',
      status: 'current'
    },
    {
      name: 'Step 3',
      href: '#',
      status: 'upcoming'
    },
    {
      name: 'Step 4',
      href: '#',
      status: 'upcoming'
    },
  ],
  slotList: [ ],
  questions: [
    {
        "id": 25,
        "service_id": 14,
        "order": 0,
        "question": "Adipisci ab a et sunt. ? ",
        "type": "1",
        "created_at": "2021-02-04T14:19:00.000000Z",
        "updated_at": "2021-02-04T14:19:00.000000Z",
        "answers": []
    }
],
  selectedProfessional:[],
  selectedSlot:{},
  selectedDate:{},
  selectedStep:{},
  // bookingInfo: {},
  answers: [],
  bookingStatus: {

  }
}
// booking REDUCER
const bookingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.STORE_ID:
      return {
        ...state, storeID: action.payload
      }
    case types.SERVICE_SELECT:
      return {
        ...state, selectedService: action.payload
      }
      case types.SERVICE_LIST:
        return {
          ...state, serviceList: action.payload
        }
      case types.PROFESSIONAL_SELECT:
        return {
          ...state, selectedProfessional: action.payload
        }
      case types.PROFESSIONAL_LIST:
        return {
          ...state, professionalList: action.payload
        }
      case types.SLOT_SELECT:
        return {
          ...state, selectedSlot: action.payload
        }
      case types.DATE_SELECT:
        return {
          ...state, selectedDate: action.payload
        }
      case types.SLOT_LIST:
        return {
          ...state, slotList: action.payload
        }
      case types.STEP_SELECT:
        return {
          ...state, selectedStep: action.payload
        }
      case types.STEP_LIST:
        return {
          ...state, stepList: action.payload
        }
      case types.QUESTION_LIST:
        return {
          ...state, questions: action.payload
        }
      case types.BOOKING_STATUS:
        return {
          ...state, bookingStatus: action.payload
        }
        default:
          return state
  }
}

// COMBINED REDUCERS
const reducers = {
  booking: bookingReducer,
}

export default combineReducers(reducers)
