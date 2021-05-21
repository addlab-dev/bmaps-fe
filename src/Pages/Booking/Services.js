import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectService} from '../../Store/Actions';
import { useForm } from 'react-hook-form';

const Services = () => {
    const dispatch = useDispatch();
    const test_services = useSelector((state) => state.booking.serviceList)
    const defaultService = useSelector((state)=> state.booking.selectedService)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        
        console.log(data);
        dispatch(selectService(data));
    }
    console.log(errors);
    
    // Replace with api response on load of component
    // dispatch(selectService(selectedService));
    // dispatch(serviceList(response.data.serviceList));

    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">1. Select your service</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="services_wrapper mt-5 ml-4">
            {test_services.map((category) => (
                    <section className="w-full mt-4 mb-8">
                        <h1 className="w-full text-main font-medium text-lg pl-1 mb-2" key={category.id}>{category.title}</h1>
                                    {category.services && category.services.map(service => (
                                            <div className="service relative w-full pl-3 pb-5 pt-5 border-b border-main">
                                            <label htmlFor={service.id} className="text-main font-bold text-md inline cursor-pointer">{service.name}</label>
                                            <span className="text-gray-400 text-sm pl-4">{service.time} session</span>
                                            <br></br>
                                            <h4 htmlFor={service.id} className="text-main font-bold text-sm inline cursor-pointer w-full">€ {service.price}</h4>
                                            <input
                                            id={service.id}
                                            name="serviceGroup"
                                            type="radio"
                                            value={service.id}
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5"
                                            {...register('serviceGroup',{ required: true })}
                                            />
                                            <p className="text-gray-500 text-sm pt-2">
                                                {service.desription}
                                            </p>
                                            </div>
                                    ))}
                    </section>
                       ))}
                       
            </div>
            <input className="text-white bg-main rounded px-16 py-2 text-sm fixed right-12 bottom-12" type="submit" value="Select" />
            </form>
        </div>
        </>
    )
}
export default Services