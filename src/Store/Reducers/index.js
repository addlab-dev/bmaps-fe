import {
  combineReducers
} from 'redux'
import * as types from '../Actions/actionTypes'
const defaultState = {
  selectedService: {},
  serviceList: [{
      title: 'Popular Treatments',
      id: '1-f',
      services: [{
          name: 'Power shape 1',
          id: 1,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
        {
          name: 'Power shape 2',
          id: 2,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
        {
          name: 'Power shape 4',
          id: 4,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
        {
          name: 'Power shape 6',
          id: 6,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
      ]
    },
    {
      title: 'Body Remodelling',
      id: '1-d',
      services: [{
          name: 'Reducing fat hip',
          id: 7,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
        {
          name: 'Reducing Body mass',
          id: 8,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
        {
          name: 'Power shape 6',
          id: 9,
          time: '1hr',
          price: 0,
          description: 'service description if exists appears here'
        },
      ]
    },
  ],
  professionalList: [{
      name: 'Liviana Arsenio',
      id: 1
    },
    {
      name: 'Agnese Palladino',
      id: 2
    },
    {
      name: 'Terrance Wolff',
      id: 4
    },
    {
      name: 'Liviana Arsenio',
      id: 6
    },
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
  slotList: [{
      time: '10:00',
    },
    {
      time: '11:00',
    },
    {
      time: '12:00',
    },
    {
      time: '13:00',
    },
    {
      time: '14:00',
    },
    {
      time: '15:00',
    },
    {
      time: '16:00',
    },
    {
      time: '17:00',
    },
    {
      time: '18:00',
    }
  ],
  selectedProfessional:[],
  selectedSlot:{},
  selectedDate:{},
  selectedStep:{},
  bookingInfo: {},
  slot_value: "",
  sel_service: "",
  staff_id: "",
  questions: [{
    question_id: "",
    question_type: "",
  }],
  answers: [],
  bookingStatus: {

  }
}
// booking REDUCER
const bookingReducer = (state = defaultState, action) => {
  switch (action.type) {
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
        default:
          return state
  }
}

// COMBINED REDUCERS
const reducers = {
  booking: bookingReducer,
}

export default combineReducers(reducers)
