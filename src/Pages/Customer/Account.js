import { useForm } from 'react-hook-form'
import useAuthContext from '../../Hooks/useAuthContext'
import { get } from 'lodash';
import { BrowserRouter as Router, Link} from 'react-router-dom'
import React,{ useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Api from '../../Api/Api';
import { profileInfo,loginReturn } from '../../Store/Actions';
import { useSnackbar } from 'notistack';
import Spinner from "../../Components/Spinner"

const Account = () => {
    let { id } = useParams();
    const {authState} = useAuthContext();
    const dispatch = useDispatch();
    const history = useHistory();
    const shopID = useSelector((state) => state.booking.storeID)
    const { register, handleSubmit ,formState: { errors }} = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const { login, authState } = useAuthContext()
    const [err, setErr] = useState(null)
    const [profile, setProfile] = useState(useSelector((state) => state.booking.profile));
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if(typeof window != 'undefined' && !shopID) {
          history.push(`/${id}/services`) 
      } 
      if(!authState.token) {
        dispatch(loginReturn("account"))
        history.push(`/${id}/login`)
      }
      setLoading(true)
        Api.getProfile( {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => {dispatch(profileInfo(response)); setProfile(response); setLoading(false)});
    },[]); 
    
    const onSubmit = (data) => {
        setProcessing(true)
        setProfile(data);
        console.log(data);
        Api.setProfile({
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            // contact: data.contact,
            address: data.address,
            gender: data.gender,
            bdate: data.bdate,
          }).then((res) => {
              setProcessing(false)
              enqueueSnackbar('Profile Updated',{ variant: 'success'});
          }, (error) => {
            console.log(error);
              setProcessing(false)
              enqueueSnackbar('Uh oh! Problem occurred, please try again',{ variant: 'error'});
          },closeSnackbar());
      }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
        <h1 className="w-full text-main font-bold text-xl pl-1 mb-2" >Conto</h1>
            <div className="pofile_wrapper mt-5 h-full relative">
                    <section className="w-full min-h-full mt-4 mb-8 pb-28 h-auto">
                    {loading ? 
                <Spinner size={10} color={"main"}/>
               :
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                    <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="text"
                            defaultValue={profile.fname}
                            {...register("fname",{ type: 'text' })}
                            name="fname"
                            id="fname"
                            autoComplete="off"
                            placeholder="Nome"
                            className="text-input"
                            />
                        </div>
                        </div>
                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="text"
                            defaultValue={profile.lname}
                            {...register("lname",{ type: 'text' })}
                            name="lname"
                            id="lname"
                            autoComplete="off"
                            placeholder="Cognome"
                            className="text-input"
                            />
                        </div>
                        </div>
                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="text"
                            defaultValue={profile.contact}
                            {...register("contact",{ type: 'text' })}
                            name="contact"
                            id="contact"
                            autoComplete="off"
                            placeholder="Contatta"
                            className="text-input"
                            />
                        </div>
                        </div>
                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="email"
                            disabled
                            defaultValue={profile.email}
                            {...register("email",{ type: 'email' })}
                            name="email"
                            id="email"
                            autoComplete="off"
                            placeholder="Email"
                            className="text-input"
                            />
                        </div>
                        </div>
                        {/* <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="Password"
                            defaultValue={profile.password}
                            {...register("password",{ type: 'password' })}
                            name="password"
                            id="Password"
                            autoComplete="off"
                            placeholder="Password"
                            className="text-input"
                            />
                        </div>
                        </div>
                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="password"
                            defaultValue={profile.password_confirmation}
                            {...register("password_confirmation",{ type: 'password' })}
                            name="password_confirmation"
                            id="password_confirmation"
                            autoComplete="off"
                            placeholder="Conferma la password"
                            className="text-input"
                            />
                        </div>
                        </div> */}
                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="date"
                            defaultValue={profile.bdate}
                            {...register("bdate",{ type: 'date' })}
                            name="bdate"
                            id="bdate"
                            autoComplete="off"
                            placeholder="Data di nascita"
                            className="text-input"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <div className="mt-1">
                        <select
                            id="gender"
                            name="gender"
                            defaultValue={profile.gender}
                            {...register("gender",{ required: true })}
                            autoComplete="genere"
                            className="text-input">
                                <option disabled>Genere</option>
                                <option value="0">Maschio</option>
                                <option value="1">Femminile</option>
                                <option value="2">Altro</option>
                        </select>
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="text"
                            defaultValue={profile.address}
                            {...register("address",{ type: 'text' })}
                            name="address"
                            id="address"
                            autoComplete="off"
                            placeholder="Indirizzo"
                            className="text-input"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <div className="mt-3">
                        <input
                            id="newsconsent"
                            {...register("newsconsent",{ type: 'checkbox' })}
                            name="newsconsent"
                            type="checkbox"
                            className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 mr-3 focus:ring-0 focus:outline-none outline-none" />
                        <label htmlFor="newsconsent" className="text-gray-400 font-normal text-md inline cursor-pointer">
                        Inviatemi notizie, aggiornamenti e altre offerte interessanti.
                        </label> 
                        </div>
                        </div>
                        <div className="fixed right-8 bottom-8 flex flex-wrap  gap-x-1 items-center justify-center">

            <input type="submit" className="shadow-lg text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg" value={processing? "Presentare..." : "Update details"}/>
            </div>
                    </form> }
                    </section> 
            </div>

            
        </div>
        </>
    )
}
export default Account