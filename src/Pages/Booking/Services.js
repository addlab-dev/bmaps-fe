import React, {useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectService,serviceList,getStoreID,questionList} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Api from '../../Api/Api';
import { useParams } from "react-router";
import applyTheme from '../../Theme/applyTheme'
import WebFont from 'webfontloader'
import defaultTheme from '../../Theme/defaultTheme'
import Spinner from "../../Components/Spinner"

const Services = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();
    const shop_services = useSelector((state) => state.booking.serviceList)    
    const selectedService = useSelector((state) => state.booking.selectedService)    
    const shopID = useSelector((state) => state.booking.storeID)
    const { register, handleSubmit, errors } = useForm();
    const [services, setServices] = useState([]);
    const [selService, setSelService] = useState();
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [checkedState, setCheckedState] = useState();
    const [data, setData] = useState(null);

    useEffect(() => {
        dispatch(getStoreID(id))
        setLoading(true)
        Api.getData(id).then((res) => {
            setData(res.customizations[0])
            WebFont.load({
                google: {
                  families: [`${res.customizations[0].body_font}:400,700`, `${res.customizations[0].title_font}:400,700`],
                },
              })
              const theme = {
                ...defaultTheme,
                fontMain: res.customizations[0].body_font,
                fontTitle: res.customizations[0].title_font,
                primaryColor: res.customizations[0].primary_color,
                secondaryColor: res.customizations[0].secondary_color,
              }
              applyTheme(theme)
        })
        Api.getService(id).then((res) => {
            setServices(res)
            dispatch(serviceList(res))
            setLoading(false)
        })
        setSelService(selectedService)
    }, [])
    
    const onSubmit = (data) => {
        dispatch(selectService(data));
        setProcessing(true)
        Api.getQuest(id, data.service ).then((res) => {
            dispatch(questionList(res))
            setProcessing(false)
        }).then(()=> {
            history.push({pathname:`/${shopID}/slots`, state:{data}});
        })
    }
    const changeService = (event) => {
        setSelService(event.target.value);
        dispatch(selectService(event.target.value));
    }

    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative pb-24">
            <div className="w-full h-auto" >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">1. Select your service</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="services_wrapper mt-5 ml-4">
            {loading ? <Spinner size={10} color={"main"}/>
            : <>{shop_services.map((category) => (
                <section key={category.title} className="w-full mt-4 mb-8">
                    <h1 className="w-full text-main font-medium text-lg pl-1 mb-2">{category.title}</h1>
                        {category.services && category.services.map(service => (
                            <div htmlFor={service.id} key={service.id} className="service relative w-full pl-3 border-b border-main">
                                <label  className="text-main w-full pb-5 pt-5 font-bold flex flex-col justify-center text-md cursor-pointer">
                                    <span className="flex items-center">{service.vendor_service.name}
                                    <span className="text-gray-400 text-sm pl-4">{service.duration} Min session</span></span>
                                    <h4 htmlFor={service.id} className="text-main font-bold text-sm mt-3 inline cursor-pointer w-full">€ {service.price}</h4>
                                    <input
                                        id={service.id}
                                        name="service"
                                        type="radio"
                                        onClick={changeService}
                                        value={service.id}
                                        checked={selService == service.id }
                                        className="focus:text-main h-5 w-5 text-main border-gray-300 absolute right-5"
                                        {...register('service',{ required: true })}/>
                                    <p className="text-gray-500 text-sm pt-2 w-11/12 font-normal">{service.vendor_service.note}</p>
                                </label>
                            </div>))}
                </section>))}</> }
            </div>
            <input className="text-white bg-main rounded px-16 py-2 text-sm fixed right-12 bottom-12" type="submit" value={processing? "Processing..." : "Select"} />
            </form>
        </div>
        </>
    )
}
export default Services