import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RadioGroup } from '@headlessui/react'


const calendarSetting = {
    locale : 'it-IT',
    minDate : new Date(),
    //activeStartDate : new Date(),
    maxDate : new Date('2021-07-14'),
    defaultView : 'month',
    view : 'month'
}

const plans = [
    {
      name: '10:00',
    },
    {
      name: '11:00',
    },
    {
      name: '12:00',
    },
    {
        name: '13:00',
      },
      {
        name: '14:00',
      },
      {
        name: '15:00',
      },
      {
          name: '16:00',
        },
        {
          name: '17:00',
        },
        {
          name: '18:00',
        }
  ]
  

const Slots = () => {
    const [selected, setSelected] = useState(plans[0])
    const [value, onChange] = useState(new Date());
    //const [caldate, onCaldate] = useState(new Date());
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto h-full rounded-t-xl bg-red-50 relative">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">2. Select your prefrence</h1>
            </div>
            <div className="slots_wrapper mt-5">
                <div className="calendar_wrapper border-b border-main pb-10">
                    <h3 className="text-main text-lg font-bold">Date :</h3>
                    <Calendar 
                    {...calendarSetting}
                    onChange={onChange}
                    value={value}
                    />
                </div>
                <div className="times_wrapper mt-5">
                <h3 className="text-main text-lg font-bold">Time :</h3>
                    
                <div className=" px-4 py-4">
     
        <RadioGroup value={selected} >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="mx-4 flex flex-wrap  gap-x-7 gap-y-4 items-center justify-center ">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-light-blue-300  ring-opacity-60'
                      : ''
                  }
                  ${
                    checked
                      ? 'bg-main bg-opacity-75 text-white'
                      : 'bg-transparent shadow-none'
                  }
                    grid relative rounded-lg shadow-md px-3 py-2 cursor-pointer  focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
    </div>


                </div>
            </div>
            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <button className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
            <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Next</button>
            </div>
           

        </div>
        </>
    );

}
function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
export default Slots
