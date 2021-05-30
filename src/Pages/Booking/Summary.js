import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Api from '../../Api/Api';

const Summary = () => {
  const history = useHistory();
  let { id } = useParams();
  const shopID = useSelector((state) => state.booking.storeID)
  const bookingStat = useSelector((state) => state.booking.bookingStatus)
  useEffect(() => {
    if(typeof window != 'undefined' && !shopID) {
      history.push(`/${id}/services`)
    } else {
        // dispatch(bookingStaff(staff.id))
    }
},[]); 
  const confirmBooking = () => {
    Api.bookNow(bookingStat, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then((response) => {
      if (response.status == 200) {
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
            <div className="register_wrapper mt-5 ml-4 h-full relative">
                    <section className="w-full  mt-12 mb-8 pb-20 h-auto border-b-2 border-gray-300">
                    <h1 className="w-full text-main font-bold text-lg pl-1 mb-5" >Friday 15 May, 10:30</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div>
                            <h3 className="text-main font-bold text-md w-full pb-1 ">Service:</h3>
                            <h3 className="text-main font-normal text-md w-full">Power Shape 2 - Microson</h3>
                            <span className="text-gray-400 font-normal text-sm w-full">1hr session</span>
                        </div>
                        <div className="mt-8 sm:mt-0">
                        <h3 className="text-main font-bold text-md w-full pb-1">Professional:</h3>
                            <span className="text-gray-400 font-normal text-sm w-full">Liviana Arsenio</span>

                        </div>
                      </div>
                    </section> 

                    <section className="w-full  mt-12 mb-8 pb-8 h-auto ">
                    <h1 className="w-full text-main font-bold text-lg pl-1 mb-10" >Note :</h1>
                      <div className="grid grid-cols-1">
                        <div className="mt-8 sm:mt-0">
                        
                            <p className="text-main font-normal text-md w-full">
                            - The total amount should be directly paid at the center. 
                            </p>
                            <p className="text-main font-normal text-md w-full">
                            - Payment methods accepted: Cash / Card Payments / PayPal
                            </p>
                        </div>
                      </div>
                    </section> 
            </div>

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