import React, { useState, useEffect } from "react";
import {Stepper, MobileStepper, Step, StepLabel, Button, Container, TextField, FormControlLabel, Checkbox, RadioGroup, Radio, Modal } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import {selectStep} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

const Questions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const steps = useSelector((state) => state.booking.stepList)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        dispatch(selectStep(data));
        history.push("/summary");
    }
    console.log(errors);
    const bookingInfo = useSelector((state) => state.booking.questions)
    const bookingService = useSelector((state) => state.booking.selectedService)
    const bookingStaff = useSelector((state) => state.booking.selectedProfessional)
    const bookingDate = useSelector((state) => state.booking.selectedDate)
    const bookingSlot = useSelector((state) => state.booking.selectedSlot)
    const bookingStat = useSelector((state) => state.booking.bookingStatus)
  
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [open, setOpen] = React.useState(false);
    const steps = bookingInfo.length;
    
  console.log(steps)
  console.log(bookingInfo)
    const [questions, setQuestions] = React.useState([]);
    const [answers,setAnswers] = React.useState(new Array(steps).fill(""));
  
  
    const [state, setState] = React.useState({   
        step1: 'Do you have any pre existing health conditions or allergies?',
        step2: 'Do you want to add extra services',
        step3: 'How may sessions do you want for this treatment?',
        textInput: "",
        checkboxValue: false,
        checkboxText1: "I accept and will follow all the safety and hygiene guidelines ruled out by the government and the store.",
        radioValue: "This is radio 2",
      //   registered: accState.registered,
      //   loggedIn: accState.isLoggedIn,
    });
  //   const [bookStatus, setBookStatus] = React.useState({
  //     // store_id: 1,
  //     // slot_value: bookingSlot,
  //     // service_id: serv_id,
  //     // staff_id: bookingStaff,
  //   })
  
  //   const handleLoggedIn = () => () => {
  //     debugger
  //     // API.post('placebooking/now',bookingStat)
  //     // .then((response) => {
  //     //   // console.log(response);
  //     //   router.push(`/store/${id}/book/${serv_id}/confirmation`)
  //     // }, (error) => {
  //     //   // console.log(error);
  //     // });
  //   }
  
    const handleChange = (e) => {
      const newAnswers = [...answers];
      newAnswers[activeStep] = e.target.value;
      setAnswers( newAnswers, activeStep);
    };
    const handleCheckboxChange = (event) => {
      const newAnswers = [...answers];
      if(!newAnswers[activeStep]) {
          newAnswers[activeStep] = [];
      }
      const index = newAnswers[activeStep].indexOf(event.target.value);
      if(index>-1) {
          newAnswers[activeStep].splice(index,1);
      } else {
          newAnswers[activeStep].push(event.target.value);
      }
      setAnswers( newAnswers, activeStep);
    };
    const handleRadioChange = (event) => {
      setState({ ...state, radioValue : event.target.value});
    };
    const isStepOptional = (step) => {
      return step === 0;
    };
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
    const handleNext = () => {
  
      let updateQuest = [...questions];
      updateQuest.push({
          id : bookingInfo[activeStep].id,
          type : bookingInfo[activeStep].type,
          answers : answers[activeStep]
      })
      // dispatch(bookingAnswers(updateQuest));
      setQuestions(updateQuest);
      
      // if(activeStep === steps - 1) {
      //     const uniqueObjects = [...new Map(updateQuest.map(item => [item.id, item])).values()];
      //     const finalBookStatus = {...bookStatus, answers: [...uniqueObjects]};
      //     dispatch(bookingStatus(finalBookStatus));
      //   if(window.localStorage.getItem('token') !== "null") {
      //     API.post('placebooking/now',bookingStat, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      //     .then((response) => {
      //       // console.log(response);
      //       if (response.status === 200) {
      //         router.push(`/store/${id}/book/${serv_id}/confirmation`)
      //       }
      //     }, (error) => {
      //       // console.log(error);
      //     });
      //     // debugger
      //     // handleLoggedIn();
      //   } else {
      //     handleOpen();
      //   }
      // } else {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      // }
    };
    const handleBack = () => {
      if(activeStep === 0) {
      //   router.back();
      }
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
    const handleReset = () => {
      setActiveStep(0);
    };
    function getStepContent(step) {
        if(bookingInfo[step].type == 1) {
          return (<section className="w-full mt-4 mb-8">
            <h3 className="text-main font-bold text-lg pb-4 pt-2">{bookingInfo[step].question} <span className="helper-text">(Type some text)</span></h3>
          
            <div className="w-full mt-6"><textarea
                className="shadow-sm focus:ring-main focus:border-main mt-1 block w-full sm:text-sm border-gray-300 rounded-md bg-red-50"
                placeholder="Please Describe"
                defaultValue={''}
                rows={4}
                multiline
                type="text"
                value={answers[step] || ""}
                onChange={handleChange}
                InputProps={{ disableUnderline: true}}
            /></div>
          </section>)
        } else if (bookingInfo[step].type == 2) {
          return (<section className="w-full mt-4 mb-8">
            <h3  className="text-main font-bold text-lg pb-4 pt-2">{bookingInfo[step].question}<span className="helper-text">(Select 1 option minimum)</span></h3>
            <div className="w-full mt-6">{bookingInfo[step].answers.map(answer =>
          <FormControlLabel key={answer.id} className="text-main font-bold text-md inline cursor-pointer"
                        control={<Checkbox className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5" name={answer.name} value={answer.id} onChange={handleCheckboxChange} />} 
                        label={<div><h5>{answer.answer}</h5><p>This is an additional message</p></div>}
                    />)}</div>
          </section>)
        } else if (bookingInfo[step].type == 3) {
          return (<section className="w-full mt-4 mb-8">
            <h3  className="text-main font-bold text-lg pb-4 pt-2">{bookingInfo[step].question}<span className="helper-text">(Select 1 option)</span></h3>
            <div className="w-full mt-6"><RadioGroup className="booking-info-radio" aria-label="multi" name="multi1" value={Number(answers[step])} onChange={handleChange}>
            {bookingInfo[step].answers.map(answer => <FormControlLabel className="text-main font-bold text-md inline cursor-pointer" key={answer.answer} value={Number(answer.id)} control={<Radio className="focus:text-main h-5 w-5 top-1/3 text-main border-gray-300 absolute right-5"/>} label={<div><h5>{answer.answer}</h5></div>} />)}
          </RadioGroup></div>
          </section>)
        }
    }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto relative " >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">4. Tell us know a more about yourself.</h1>
                    <nav className="absolute right-5 top-5" aria-label="Progress">
                            <ol className="ml-8 flex items-center space-x-5">
                                {/* {steps.map((step) => (
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
                                ))} */}
                            </ol>
                            <Stepper 
                            variant="dots"
                            className="ml-8 flex items-center space-x-5"
                                steps={bookingInfo.length}
                                position="static"
                                activeStep={activeStep}>
                                {bookingInfo.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                    labelProps.optional = <label variant="caption"></label>;
                                    }
                                    if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                    }
                                    return (
                                    <Step key={label} {...stepProps} classes={{root: "block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400", active:"relative block w-2.5 h-2.5 bg-main rounded-full",completed:"block w-2.5 h-2.5 bg-main rounded-full hover:bg-main"}}>
                                        {/* <StepLabel {...labelProps}></StepLabel> */}
                                    </Step>
                                    );
                                })}
                            </Stepper>
                    </nav>
            </div>
            <div className="questions_wrapper mt-5 ml-4">
            {getStepContent(activeStep)}
                    {/* <section className="w-full mt-4 mb-8">
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
                    </section> */}

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
                <button onClick={handleBack} className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
                <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg" disabled={answers[activeStep] == ""} onClick={handleNext}>
                    {activeStep === steps-1 ? 'Finish' : 'Next'}
                  </button>
            {/* <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Next</button> */}
            </div>
        </div>
        </>
    )
}
export default Questions