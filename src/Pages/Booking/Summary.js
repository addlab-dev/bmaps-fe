import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Api from '../../Api/Api';
import AppointmentDetails from '../../Components/AppointmentDetails';
import { useSnackbar } from 'notistack';

const Summary = () => {
  const history = useHistory();
  let { id } = useParams();
  const shopID = useSelector((state) => state.booking.storeID)
  const bookingStat = useSelector((state) => state.booking.bookingStatus)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [summary,setSummary] = useState();
  useEffect(() => {
    if(typeof window != 'undefined' && !shopID) {
      history.push(`/${id}/services`)
    } else {
        // dispatch(bookingStaff(staff.id))
    }
    Api.getSummary(bookingStat).then((response) => {
      setSummary(response);
    })
},[]); 
  const confirmBooking = () => {
    Api.bookNow(bookingStat, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then((response) => {
      if (response.status == 200) {
        enqueueSnackbar('Booking Successful');
        history.push(`/${id}/appointments`)
      }
    }, (error) => {
      console.log(error);
    });
  }
    return(
        <>
    <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
        <h1 className="w-full text-main font-medium text-xl pl-1 mb-2" >Summary</h1>
            <AppointmentDetails {...summary}/>
            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
            <button onClick={()=> {history.push(`/${shopID}/questions`);}} className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
            <button onClick={confirmBooking} className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Confirm Booking</button>
            </div>
        </div>
        </>
    )
}

export default Summary