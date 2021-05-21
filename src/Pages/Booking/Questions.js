import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectStep} from '../../Store/Actions';
import { useForm } from 'react-hook-form';

const Questions = () => {
    const dispatch = useDispatch();
    const steps = useSelector((state) => state.booking.stepList)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        
        console.log(data);
        dispatch(selectStep(data));
    }
    console.log(errors);
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto relative " >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">4. Tell us know a more about youself.</h1>
                    <nav className="absolute right-5 top-5" aria-label="Progress">
                            <ol className="ml-8 flex items-center space-x-5">
                                {steps.map((step) => (
                                <li key={step.name}>
                                    {step.status === 'complete' ? (
                                    <a href={step.href} className="block w-2.5 h-2.5 bg-main rounded-full hover:bg-main">
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                    ) : step.status === 'current' ? (
                                    <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                                        <span className="relative block w-2.5 h-2.5 bg-main rounded-full" aria-hidden="true" />
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                    ) : (
                                    <a href={step.href} className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                    )}
                                </li>
                                ))}
                            </ol>
                    </nav>
            </div>
            <div className="questions_wrapper mt-5 ml-4">
                    <section className="w-full mt-4 mb-8">
                            <h1 className="text-main font-bold text-lg pb-4 pt-2 ">Do you have any pre existing health conditions or allergies?</h1>
                            <div className="w-full mt-6">
                            <textarea
                                id="about"
                                name="about"
                                rows={4}
                                className="shadow-sm focus:ring-main focus:border-main mt-1 block w-full sm:text-sm border-gray-300 rounded-md bg-red-50"
                                placeholder="Please Describe"
                                defaultValue={''}
                            />
                            </div>
                    </section>

                            {/* <section className="w-full mt-4 mb-1">
                            <h1 className="text-main font-bold text-lg pb-4 pt-2 ">
                                    How many sessions do you want for this treatment?
                                    <br/>
                                    <span className="w-full text-gray-500 font-normal text-sm">(Select 1 option)</span>
                            </h1>
                            <div className="w-full mt-6">
                            <div className="prof relative w-full pl-1 pb-5 pt-5 border-b border-gray-300">
                                            <label htmlFor="x1" className="text-main font-bold text-md inline cursor-pointer">4 sessions - 3 weeks</label>
                                            <input
                                            id="x1"
                                            name="group1"
                                            type="radio"
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" />
                                </div>
                                <div className="prof relative w-full pl-1 pb-5 pt-5 border-b border-gray-300">
                                            <label htmlFor="x2" className="text-main font-bold text-md inline cursor-pointer">4 sessions - 3 weeks</label>
                                            <input
                                            id="x2"
                                            name="group1"
                                            type="radio"
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" />
                                </div>
                                <div className="prof relative w-full pl-1 pb-5 pt-5 border-b border-gray-300">
                                            <label htmlFor="x3" className="text-main font-bold text-md inline cursor-pointer">4 sessions - 3 weeks</label>
                                            <input
                                            id="x3"
                                            name="group1"
                                            type="radio"
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" />
                                </div>
                                <div className="prof relative w-full pl-1 pb-5 pt-5 border-b border-gray-300">
                                            <label htmlFor="x4" className="text-main font-bold text-md inline cursor-pointer">4 sessions - 3 weeks</label>
                                            <input
                                            id="x4"
                                            name="group1"
                                            type="radio"
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" />
                                </div>

                            </div>
                    </section> */}
            </div>



            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <button className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
            <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Next</button>
            </div>
        </div>
        </>
    )
}
export default Questions