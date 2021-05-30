import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectProfessional,professionalList} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Api from '../../Api/Api';


const Professionals = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const professionals = useSelector((state) => state.booking.professionalList)
    const bookingService = useSelector((state) => state.booking.selectedService)
    const bookingDate = useSelector((state) => state.booking.selectedDate)
    const shopID = useSelector((state) => state.booking.storeID)
    const { register, handleSubmit, errors } = useForm();
    const [searchValue, setSearchValue] = useState("");
    let { id } = useParams();
    const filterProf = ({ name }) => {
        let searchProf = name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
        return searchProf;
      };
      useEffect(() => {
        if(typeof window !== 'undefined' && !shopID) {
          history.push(`/${id}/services`)
        } else {
            let newSelDate = bookingDate.toLocaleDateString("it-IT").slice(0, 10).replace(/\//g, '-');
            Api.getProf(id, bookingService.service, newSelDate ).then((res) => {
                dispatch(professionalList(res))
            })
        }
    },[]); 
    const onSubmit = (data) => {
        dispatch(selectProfessional(data));
        history.push(`/${shopID}/questions`);
    }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">3. Select professional</h1>
            </div>
            <input type="text" placeholder="Search a professional" onChange={e => setSearchValue(e.target.value)} value={searchValue} className="pl-2 ml-4 text-main focus:border-transparent focus:outline-none w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300"/>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="professionals_wrapper mt-5 ml-4">
                    <section className="w-full mt-4 mb-8">
                            {professionals.filter(filterProf).map((prof) =>(
                                <div key={prof.id} className="prof relative w-full pl-1  border-b border-gray-300">
                                    <label htmlFor={prof.id} className="text-main relative w-full pb-5 pt-5 font-bold text-md inline-flex cursor-pointer">{prof.name}
                                    <input
                                    id={prof.id}
                                    value={prof.id}
                                    name="prof"
                                    type="radio"
                                    {...register('prof',{ required: true })}
                                    className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" /></label>
                                </div>
                            ))}
                    </section>
            </div>

            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <button onClick={()=> {history.push(`/${shopID}/slots`);}} className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
            <input type="submit" className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg" value="Proceed"/>
            </div>
            </form>
        </div>
        </>
    )
}
export default Professionals