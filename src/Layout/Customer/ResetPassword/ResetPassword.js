import React from 'react'

const ResetPassword = () => {
    return (
        <>
   <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
        <h1 className="w-full text-main font-medium text-xl pl-1 mb-2" >Reset Password</h1>
            <div className="register_wrapper mt-5 ml-4 h-full relative">
                    <section className="w-full h-full mt-32 mb-8 ">
                    <h1 className="mb-10 w-full text-center text-main font-normal text-md">Enter your email address, we will send you reset link</h1>
                    <form className="space-y-8 ">
                    <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="off"
                            placeholder="Enter Your Email Address"
                            className="text-input"
                            />
                        </div>
                        </div>
                    </form>
                    </section> 
            </div>

            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <div className="pr-5"><a class="text-main font-bold text-sm" href="#">Register</a></div>
            <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Reset Password</button>
            </div>
        </div>
        </>
    )
}
export default ResetPassword;