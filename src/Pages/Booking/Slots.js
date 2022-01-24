import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RadioGroup } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSlot, selectDate, slotList} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Api from '../../Api/Api';
import Spinner from "../../Components/Spinner"
import { useSnackbar } from 'notistack';

const calendarSetting = {
    locale : 'it-IT',
    minDate : new Date(),
    //activeStartDate : new Date(),
    defaultView : 'month',
    view : 'month'
}

const Slots = () => {
    
    //const [caldate, onCaldate] = useState(new Date());
    const dispatch = useDispatch();
    const history = useHistory();
    const plans = useSelector((state) => state.booking.slotList)
    const shopID = useSelector((state) => state.booking.storeID)
    const bookingService = useSelector((state) => state.booking.selectedService)
    const bookingSlot = useSelector((state) => state.booking.selectedSlot)
    const { register, handleSubmit, errors } = useForm();

    // const [plans,setPlans] = useState();
    const [selected, setSelected] = useState(plans[0])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [value, setValue] = useState(new Date());
    let { id } = useParams();

    const onDateChange = (event) => {
      setValue(event);
      let newSelDate = event.toLocaleDateString("it-IT").slice(0, 10).replace(/\//g, '-');
      setLoading(true)
      Api.getSlots(id, bookingService.service, newSelDate ).then((res) => {
        dispatch(slotList(res))
        setLoading(false)
    })
    }

    const onSubmit = (data) => {
      closeSnackbar()
      setProcessing(true)
        dispatch(selectDate(value));
        dispatch(selectSlot(data));
        setProcessing(false)
        history.push(`/${shopID}/professionals`);
    }
    
    useEffect(() => {
      let today = new Date()
      let newSelDate = today.toLocaleDateString("it-IT").slice(0, 10).replace(/\//g, '-');
      if(typeof window !== 'undefined' && !shopID) {
        history.push(`/${id}/services`)
      } else {
        setLoading(true)
        Api.getSlots(id, bookingService.service, newSelDate ).then((res) => {
          dispatch(slotList(res))
          setLoading(false)
        })
      }
  },[]);  

    const btnClick = () => {
      console.log("hello")
        enqueueSnackbar('Si prega di selezionare una fascia oraria',{ variant: 'info'});
      
    }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto h-full rounded-t-xl bg-red-50 relative pb-16">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg py-2 ">2. Seleziona la tua preferenza</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id="slot-form">
            <div className="slots_wrapper ml-5">
                <div className="calendar_wrapper border-b border-main pb-10">
                    <h3 className="text-main text-lg font-bold">Data :</h3>
                    <Calendar 
                    {...calendarSetting}
                    onChange={onDateChange}
                    value={value}
                    />
                </div>
                <div className="times_wrapper mt-5">
                <h3 className="text-main text-lg font-bold">Tempo :</h3>
                {loading ? 
                <Spinner size={10} color={"main"}/>
               : <div className=" p-4">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Seleziona il tempo</RadioGroup.Label>
          <div className="flex flex-wrap gap-x-2 items-center justify-space-evenly ">
            {plans.map((plan) => (
              <RadioGroup.Option
              as="label" htmlFor={plan.time}
                key={plan.slot}
                value={plan.dateValue}
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
                            }`}>
                            {plan.slot}
                            <input
                              id={plan.slot}
                              name="time"
                              type="radio"
                              value={plan.dateValue}
                              required="true"
                              // checked={plan.dateValue == plans[0].dateValue ? true : false}
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
    </div> }
                </div>
            </div>
            <div className="fixed right-8 bottom-8 flex flex-wrap gap-x-1 items-center justify-space-evenly">
                <button type="button" onClick={()=> {history.push(`/${shopID}/services`);}} className="shadow-lg text-main bg-white rounded px-5 py-2 grid text-md mr-3 focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
                <input type="submit" onClick={btnClick} className="shadow-lg text-white bg-main rounded px-16 py-2 text-sm focus:outline-none hover:shadow-lg" value={processing? "Elaborazione..." : "Prossimo"} />
            </div>
           
            </form>
        </div>
        </>
    );

}
export default Slots
