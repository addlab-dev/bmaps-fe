import React from 'react'

const Profile = () => {
    return(
        <>
    <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <h1 className="w-full text-main font-medium text-xl pl-1 mb-2" >Register</h1>
                <div className="register_wrapper mt-5 ml-4 h-full relative">
                        <section className="w-full min-h-full mt-4 mb-8 pb-28 h-auto">
                        <form className="space-y-8 ">
                        <div className="sm:col-span-3">
                            <div className="mt-1">
                                <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                autocomplete="off"
                                placeholder="Name"
                                className="text-input"
                                />
                            </div>
                            </div>
                            <div className="sm:col-span-3">
                            <div className="mt-1">
                                <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                autocomplete="off"
                                placeholder="Last Name"
                                className="text-input"
                                />
                            </div>
                            </div>
                            <div className="sm:col-span-3">
                            <div className="mt-1">
                                <input
                                type="text"
                                name="phone"
                                id="phone"
                                autocomplete="off"
                                placeholder="Contact"
                                className="text-input"
                                />
                            </div>
                            </div>
                            <div className="sm:col-span-3">
                            <div className="mt-1">
                                <input
                                type="email"
                                name="email"
                                id="email"
                                autocomplete="off"
                                placeholder="Email"
                                className="text-input"
                                />
                            </div>
                            </div>
                            <div className="sm:col-span-3">
                            <div className="mt-1">
                                <input
                                type="date"
                                name="dob"
                                id="dob"
                                autocomplete="off"
                                placeholder="Date of birth"
                                className="text-input"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <div className="mt-1">
                            <select
                                id="gender"
                                name="gender"
                                autoComplete="gender"
                                className="text-input">
                                    <option>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                            </select>
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <div className="mt-1">
                                <input
                                type="text"
                                name="address"
                                id="address"
                                autocomplete="off"
                                placeholder="Address"
                                className="text-input"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                        <div className="mt-3">
                        <input
                            id="newsconsent"
                            name="newsconsent"
                            type="checkbox"
                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 mr-3 focus:ring-0 focus:outline-none outline-none" />
                        <label htmlFor="newsconsent" className="text-gray-400 font-normal text-md inline cursor-pointer">
                        Send me news, updates, and other interesting offers.
                        </label> 
                        </div>
                        </div>
                        </form>
                        </section> 
                </div>

                <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Update Profile</button>
                </div>
            </div>
        </>
    )
}
export default Profile