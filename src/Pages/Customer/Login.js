import React,{useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Api from '../../Api/Api';
import useAuthContext from '../../Hooks/useAuthContext'
import { get } from 'lodash'
import { useParams } from "react-router";
import { useSelector,useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, useHistory} from 'react-router-dom'
import { useSnackbar } from 'notistack';
const Login = () => {
    const { register, handleSubmit ,formState: { errors }} = useForm();
    const { login, authState } = useAuthContext()
    const [err, setErr] = useState(null)
    const bookingStat = useSelector((state) => state.booking.bookingStatus)
    const loginReturn = useSelector((state) => state.booking.loginReturn)
    const shopID = useSelector((state) => state.booking.storeID)
    let { id } = useParams();
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(() => {
      if(typeof window !== 'undefined' && !shopID) {
        history.push(`/${id}/services`)
      }
    },[]);
    const onSubmit = async (data) => {
        try {
       //   await store.set('login.remember_password', data.remember_password)
          const res = await Api.login({
            email: data.email,
            password: data.password,
            device_name: 'web',
          })
          await login({
            token: res.plainTextToken,
          })
          enqueueSnackbar('Accesso riuscito',{ variant: 'success'});
          afterLogin(res)
        } catch (error) {
          setErr(error.data.error)
        }
        return data
      }
      const afterLogin = (res) => {
          history.push(`/${id}/${loginReturn}`)
      }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative h-screen">
          
        <h1 className="w-full text-main font-medium text-xl pl-1 mb-2" >Accedi</h1>
            <div className="login_wrapper mt-5 ml-4 h-full relative">
                <section className="w-full min-h-full mt-4 mb-8 h-auto">
                    <h1 className="mb-10 w-full text-center text-main font-bold text-lg">Accedi al tuo account per continuare il processo di prenotazione</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                    <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="email"
                            {...register("email",{ required: true, type: 'email' })}
                            id="email"
                            autoComplete="off"
                            placeholder="Email"
                            className="text-input"   
                            />
                            <span className="text-red-600 text-xs pl-2">
                            {errors.email?.type === 'required' && 'Campo richiesto'}
                            </span>
                        </div>
                        </div>
                        <div className="sm:col-span-3">
                        <div className="mt-1">
                            <input
                            type="password"
                            { ...register("password",{required:true})}
                            id="password"
                            autoComplete="off"
                            placeholder="Password"
                            className="text-input"
                            />
                            <span className="text-red-600 text-xs pl-2">
                            {errors.password?.type === 'required' && 'Campo richiesto'}
                            </span>
                        </div>
                        </div>   
                        <div className="sm:col-span-3 text-left">
                        <span className="text-red-600 text-xs pl-2">{err? err : ""}</span>
                        </div>  
                        <div className="sm:col-span-3 text-right">
                                <a className="text-gray-400 right-0 font-normal text-sm" href="#">Hai dimenticato la password?</a>
                        </div>  
                        <div className="fixed right-8 bottom-8 flex flex-wrap  gap-x-1 items-center justify-center">
                <div className="pr-5"><span className="text-gray-400 text-sm">Non hai un account?</span> <Link to={location => ({ ...location, pathname: 'register' })} className="text-main font-bold text-sm">Registrati</Link></div>
            <button type="submit" className="shadow-lg text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Accedi</button>
            </div>                 
           </form>
         </section> 
       </div>            
        </div>
        </>
    )
}
export default Login;