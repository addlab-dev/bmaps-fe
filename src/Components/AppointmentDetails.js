
import React from 'react'
import Api from '../Api/Api';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';

const AppointmentDetails = (booking) => {
    let { id } = useParams();
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const cancelBooking = (event) => {
        let cancelledBooking = {booking_id: event.target.value}
      Api.cancelBooking(cancelledBooking).then((res) => {
        if (res.data == "Cancelled") {
          enqueueSnackbar('Prenotazione cancellata',{ variant: 'info'});
            history.push(`/${id}/appointments`)
          }
      })
    }
    return(
        <>
            <div className="appointments_wrapper mt-2 h-full relative">
                    <section className="w-full pl-2 mt-2 mb-4 pb-4 h-auto border-b-2 border-gray-300">
                    <h1 className="w-full text-main font-bold text-lg mb-4" >{booking.service_date}</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div>
                            <h3 className="text-main font-bold text-md w-full pb-1 ">Servizio:</h3>
                            <h3 className="text-main font-normal text-md w-full">{booking.service_name}</h3>
                            <span className="text-gray-400 font-normal text-sm w-full">{booking.service_duration} min sessione</span>
                        </div>
                        <div className="mt-8 sm:mt-0">
                        <h3 className="text-main font-bold text-md w-full pb-1">Professionista:</h3>
                            <span className="text-gray-400 font-normal text-sm w-full">{booking.staff}</span>
                        </div>
                        
                      </div>
                      <p className="text-main font-normal text-md w-full mt-4">{booking.service_info}</p>
                      {booking.when == "upcoming" ?
                      <button onClick={cancelBooking} value={booking.id} className="mt-5 text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Cancellare la prenotazione</button>
                    :""}
                    </section> 
                   {booking.payments_accepted ? <section className="w-full  mt-4 mb-4 pb-4 h-auto ">
                    <h1 className="w-full text-main font-bold text-lg pl-1 mb-4" >Nota :</h1>
                      <div className="grid grid-cols-1">
                        <div className="mt-4 sm:mt-0">                        
                            <p className="text-main font-normal text-md w-full">
                            - L'importo totale deve essere pagato direttamente al centro. 
                            </p>
                            <p className="text-main font-normal text-md w-full">
                            - Metodi di pagamento accettati: {booking.payments_accepted.map((item,index)=> <span key={`demo_snap_${index}`}>{ (index ? ' / ' : '') + item }</span>)}
                            </p>
                        </div>
                      </div>
                    </section> : ""}
            </div>
        </>
    )
}
export default AppointmentDetails