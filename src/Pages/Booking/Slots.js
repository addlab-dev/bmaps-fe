import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RadioGroup } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSlot, selectDate} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

const calendarSetting = {
    locale : 'it-IT',
    minDate : new Date(),
    //activeStartDate : new Date(),
    maxDate : new Date('2021-07-14'),
    defaultView : 'month',
    view : 'month'
}

const Slots = () => {
    
    //const [caldate, onCaldate] = useState(new Date());
    const dispatch = useDispatch();
    const history = useHistory();
    const plans = useSelector((state) => state.booking.slotList)
    const { register, handleSubmit, errors } = useForm();
    const [selected, setSelected] = useState(plans[0])
    const [value, setValue] = useState(new Date());
    const onDateChange = (event) => {
      console.log(event);
      setValue(event);
        // let newSelDate = event.toLocaleDateString("it-IT").slice(0, 10).replace(/\//g, '-');
    }
    const onSubmit = (data) => {
        console.log(data);
        dispatch(selectDate(value));
        dispatch(selectSlot(data));
        history.push("/professionals");
    }
    console.log(errors);
    
  //   useEffect(() => {
    //  get call with service ID
  //     if(typeof window !== 'undefined' && !bookingSlot) {
  //         router.push(`/store/${id}`)
  //     } else {
  //         dispatch(bookingStaff(staff.id))
  //     }
      
  // },[router.query]);  

    
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto h-full rounded-t-xl bg-red-50 relative">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">2. Select your prefrence</h1>
            </div>
            <form >
            <div className="slots_wrapper mt-5">
                <div className="calendar_wrapper border-b border-main pb-10">
                    <h3 className="text-main text-lg font-bold">Date :</h3>
                    <Calendar 
                    {...calendarSetting}
                    onChange={onDateChange}
                    value={value}
                    />
                </div>
                <div className="times_wrapper mt-5">
                <h3 className="text-main text-lg font-bold">Time :</h3>
                    
                <div className=" px-4 py-4">
     
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Select time</RadioGroup.Label>
          <div className="mx-4 flex flex-wrap  gap-x-7 gap-y-4 items-center justify-center ">
            {plans.map((plan) => (
              <RadioGroup.Option
              as="label" htmlFor={plan.time}
                key={plan.time}
                value={plan.time}
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
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.time}
                            <input
                              id={plan.time}
                              name="time"
                              type="radio"
                              value={plan.time}
                              className="invisible hidden"
                              {...register('time',{ required: true })}
                              />
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
                <button onClick={()=> {history.push("/services");}} className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
                <input onClick={handleSubmit(onSubmit)} type="submit" className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg" value="Next" />
            </div>
           
            </form>
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
