import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import Api from '../../Api/Api';
import useAuthContext from '../../Hooks/useAuthContext'
import { get } from 'lodash'
const Login = () => {
    const { register, handleSubmit ,formState: { errors }} = useForm();
    const { login, authState } = useAuthContext()
    const [err, setErr] = useState(null)

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
        } catch (error) {
          setErr(error)
        }
        return data
      }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative h-screen">
          
        <h1 className="w-full text-main font-medium text-xl pl-1 mb-2" >Login</h1>
            <div className="register_wrapper mt-5 ml-4 h-full relative">
                    <section className="w-full min-h-full mt-4 mb-8 h-auto">
                    <h1 className="mb-10 w-full text-center text-main font-bold text-lg">Login to your account to continue with the booking process</h1>
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
                            {errors.email?.type === 'required' && 'Required Field'}
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
                            {errors.password?.type === 'required' && 'Required Field'}
                            </span>
                        </div>
                        </div>   
                        <div className="sm:col-span-3 text-right">
                                <a className="text-gray-400 right-0 font-normal text-sm" href="#">Forgot password ?</a>
                        </div>  
                        <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <div className="pr-5"><span className="text-gray-400 text-sm">Don't have an account ?</span> <a className="text-main font-bold text-sm" href="#">Register</a></div>
            <button type="submit" className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Login</button>
            </div>                 
                    </form>
                    </section> 
            </div>
            
        </div>
        </>
    )
}
export default Login;