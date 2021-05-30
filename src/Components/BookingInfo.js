
import React,{ useState, useEffect } from 'react'
import Api from '../Api/Api';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const BookingInfo = (booking) => {
    let { id } = useParams();
    const history = useHistory();

    const cancelBooking = (event) => {
        let cancelledBooking = {booking_id: event.target.value}
      Api.cancelBooking(cancelledBooking).then((res) => {
        if (res.data == "Cancelled") {
            history.push(`/${id}/appointments`)
          }
      })
    }
    return(
        <>
            <div className="register_wrapper mt-2 ml-2 h-full relative">
                    <section className="w-full pl-2 mt-10 mb-5 pb-5 h-auto border-b-2 border-gray-300">
                    <h1 className="w-full text-main font-bold text-lg mb-5" >{booking.booking_date}</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div>
                            <h3 className="text-main font-bold text-md w-full pb-1 ">Service:</h3>
                            <h3 className="text-main font-normal text-md w-full">{booking.service_name}</h3>
                            <span className="text-gray-400 font-normal text-sm w-full">{booking.service_duration} min session</span>
                        </div>
                        <div className="mt-8 sm:mt-0">
                        <h3 className="text-main font-bold text-md w-full pb-1">Professional:</h3>
                            <span className="text-gray-400 font-normal text-sm w-full">{booking.staff}</span>
                        </div>
                        
                      </div>
                      {/* <p>{appointment.service_desc}</p> */}
                      {booking.when == "upcoming" ?
                      <button onClick={cancelBooking} value={booking.id} className="mt-5 text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Cancel Booking</button>
                    :""}
                    </section> 
                    {/* <section className="w-full  mt-12 mb-8 pb-8 h-auto ">
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
                    </section>  */}
            </div>
        </>
    )
}
export default BookingInfo