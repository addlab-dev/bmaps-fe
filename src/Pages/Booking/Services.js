import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectService} from '../../Store/Actions';

const test_services = [
    {
        title : 'Popular Treatments',
        id : '1-f',
        services : [
            {name:'Power shape 1',id : 1, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 2',id : 2, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 4',id : 4, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 6',id : 6, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },        
        ] 
    },
    {
        title : 'Body Remodelling',
        id : '1-d',
        services : [
            {name:'Reducing fat hip',id : 7, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Reducing Body mass',id : 8, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },
            {name:'Power shape 6',id : 9, time : '1hr',price: 0 ,desription:'service discription if exists appears here' },        
        ] 
    },
]

const Services = () => {
    const dispatch = useDispatch();
    dispatch(selectService("hello"));

    // Replace with api response
    // dispatch(storeStaff(response.data.staff));
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">1. Select your service</h1>
            </div>
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
                                            name="group1"
                                            type="radio"
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5"
                                            />
                                            <p className="text-gray-500 text-sm pt-2">
                                                {service.desription}
                                            </p>
                                            </div>
                                    ))}
                    </section>
                       ))}
            </div>
            <button className="text-white bg-main rounded px-16 py-2 text-sm fixed right-12 bottom-12">Select</button>

        </div>
        </>
    )
}
export default Services