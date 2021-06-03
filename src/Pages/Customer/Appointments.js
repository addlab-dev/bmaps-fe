
import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Api from '../../Api/Api';
import AppointmentDetails from '../../Components/AppointmentDetails'
import useAuthContext from '../../Hooks/useAuthContext'
import { loginReturn } from '../../Store/Actions';

const Appointments = () => {
  const dispatch = useDispatch();
    const history = useHistory();
    const {authState} = useAuthContext();
  let { id } = useParams();
  const shopID = useSelector((state) => state.booking.storeID)
  const [appointments,setAppointments] = useState();
  useEffect(() => {
    if(typeof window !== 'undefined' && !shopID) {
      history.push(`/${id}/services`)
    }
    if(!authState.token) {
      dispatch(loginReturn("summary"))
      history.push(`/${id}/login`)
    }
    Api.getAppointments( {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then((response) => {
        setAppointments(response)
        console.log(response)
        if (response.status == 200) {
        }
      }, (error) => {
        console.log(error);
      });
  },[]); 
    return(
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
        {/* <h1 className="w-full text-main font-bold text-xl pl-1 mb-2" >Appointments</h1> */}
        <h2 className="w-full text-main font-bold text-xl  mt-4 mb-2">Upcoming Appointments</h2>
          {appointments && appointments.cancelled.map((appointment)=>(
            <AppointmentDetails key={appointment.id} {...appointment}/>
          )) }
        <h2 className="w-full text-main font-bold text-xl mt-4 mb-2">Previous Appointments</h2>
          {appointments && appointments.previous.map((appointment)=>(
            <AppointmentDetails key={appointment.id} {...appointment}/>
          )) }
            
            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
            <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Book Another</button>
            </div>
        </div>
        </>
    )
}
export default Appointments