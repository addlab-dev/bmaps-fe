import React from 'react';

const professionals = [
            {name:'Liviana Arsenio',id : 1 },
            {name:'Agnese Palladino',id : 2 },
            {name:'Terrance Wolff',id : 4 },
            {name:'Liviana Arsenio',id : 6 },        
]


const Professionals = () => {
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">2. Select professional</h1>
            </div>
            <div className="profissionals_wrapper mt-5 ml-4">
                    <section className="w-full mt-4 mb-8">
                            {professionals.map((prof) =>(
                                <div className="prof relative w-full pl-1 pb-5 pt-5 border-b border-gray-300">
                                            <label htmlFor={prof.id} className="text-main font-bold text-md inline cursor-pointer">{prof.name}</label>
                                            <input
                                            id={prof.id}
                                            name="group1"
                                            type="radio"
                                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" />
                                            </div>
                            ))}
                    </section>
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
export default Professionals