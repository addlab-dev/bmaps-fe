import React from 'react';



const Confirmation = () => {
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
           
            <div className="confirmation_wrapper mt-5 ml-4 h-full relative">
                    <section className="w-full h-full mt-4 mb-8 absolute top-36">
                    <h1 className="w-3/4  text-main font-medium   text-4xl pl-1 mb-2" >Your appointment is booked!</h1>
                    <h3 className="text-main text-md pl-2 pt-5">Please check your registered email <br/>for all your appointment details.</h3>
                    </section> 
            </div>

            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
            <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Book Another</button>
            </div>
        </div>
        </>
    )
}
export default Confirmation