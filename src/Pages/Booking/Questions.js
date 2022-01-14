import React, { useState, useEffect } from "react";
import {Stepper, Step } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import {selectStep, bookingStatus, questionList, loginReturn} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Api from '../../Api/Api';
import useAuthContext from '../../Hooks/useAuthContext'

const Questions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const bookingQuest = useSelector((state) => state.booking.questions)
    const bookingService = useSelector((state) => state.booking.selectedService)
    const bookingStaff = useSelector((state) => state.booking.selectedProfessional)
    const bookingDate = useSelector((state) => state.booking.selectedDate)
    const bookingSlot = useSelector((state) => state.booking.selectedSlot)
    const bookingStat = useSelector((state) => state.booking.bookingStatus)
    const shopID = useSelector((state) => state.booking.storeID)
    const {authState} = useAuthContext();

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [open, setOpen] = React.useState(false);
    const steps = bookingQuest.length;
    let { id } = useParams();

    const [questions, setQuestions] = React.useState([]);
    const [answers,setAnswers] = React.useState(new Array(steps).fill(""));

  useEffect(() => {
    if(typeof window !== 'undefined' && !shopID) {
      history.push(`/${id}/services`)
    } 
},[]);  

    const [state, setState] = React.useState({   
        step1: 'Do you have any pre existing health conditions or allergies?',
        step2: 'Do you want to add extra services',
        step3: 'How may sessions do you want for this treatment?',
        textInput: "",
        checkboxValue: false,
        checkboxText1: "I accept and will follow all the safety and hygiene guidelines ruled out by the government and the store.",
        radioValue: "This is radio 2",
    });
    const [bookStatus, setBookStatus] = React.useState({
        store_id: shopID,
        // date: bookingDate,
        slot_value: bookingSlot.time,
        service_id: bookingService.service,
        staff_id: bookingStaff.prof,
    })
  
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
          id : bookingQuest[activeStep].id,
          type : bookingQuest[activeStep].type,
          answers : answers[activeStep]
      })
      setQuestions(updateQuest);
      
      if(activeStep === steps - 1) {
          const uniqueObjects = [...new Map(updateQuest.map(item => [item.id, item])).values()];
          const finalBookStatus = {...bookStatus, answers: [...uniqueObjects]};
          dispatch(bookingStatus(finalBookStatus));
          
          if (authState.token) {
            history.push(`/${shopID}/summary`);
          } else {
            dispatch(loginReturn("summary"))
            history.push(`/${shopID}/login`);
          }
      } else {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    };
    const handleBack = () => {
      if(activeStep === 0) {
        history.push(`/${shopID}/professionals`);
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
        if(bookingQuest[step].type == 1) {
          return (<section className="w-full mt-4 mb-8">
            <h3 className="text-main font-bold text-lg pb-4 pt-2">{bookingQuest[step].question} <span className="helper-text">(Type some text)</span></h3>
          
            <div className="w-full mt-6"><textarea
                className="shadow-sm focus:ring-main focus:border-main mt-1 block w-full sm:text-sm border-gray-300 rounded-md bg-red-50"
                placeholder="Please Describe"
                rows={4}
                type="text"
                value={answers[step] || ""}
                onChange={handleChange}
            /></div>
          </section>)
        } else if (bookingQuest[step].type == 2) {
          return (<section className="w-full mt-4 mb-8">
            <h3  className="text-main font-bold text-lg pb-4 pt-2">{bookingQuest[step].question}<span className="helper-text">(Select 1 option minimum)</span></h3>
            <div className="w-full mt-6">{bookingQuest[step].answers.map(answer =>
                <label key={answer.id} className="w-full p-2 flex flex-row justify-between text-main text-md cursor-pointer">{answer.answer}
                        <input type="checkbox" className="focus:text-main h-5 w-5 text-main border-gray-300" name={answer.name} value={answer.id} onChange={handleCheckboxChange} /> 
                        </label> 
                    )}
                    </div>
          </section>)
        } else if (bookingQuest[step].type == 3) {
          return (<section className="w-full mt-4 mb-8">
            <h3  className="text-main font-bold text-lg pb-4 pt-2">{bookingQuest[step].question}<span className="helper-text">(Select 1 option)</span></h3>
            <div className="w-full mt-6">
            {bookingQuest[step].answers.map(answer => <label className="w-full p-2 flex flex-row justify-between text-main  text-md cursor-pointer" key={answer.answer} htmlFor={Number(answer.id)} >{answer.answer}
            <input type="radio" onChange={handleChange} name="multi1" id={Number(answer.id)} value={Number(answer.id)} className="focus:text-main h-5 w-5 text-main border-gray-300 "/></label> )}
            </div>
          </section>)
        }
    }
    return (
        <>
        <div className="col-span-6 shadow-2xl p-8 row-span-9 overflow-y-auto rounded-t-xl h-full bg-red-50 relative">
            <div className="w-full h-auto relative " >
                <h1 className="text-main font-bold text-lg pb-4 pt-2 ">4. Tell us know a more about yourself.</h1>
                    <nav className="absolute right-5 top-5" aria-label="Progress">
                            <Stepper 
                            className="ml-8 flex items-center space-x-2"
                            style={{backgroundColor:"transparent",padding:"0"}}
                                steps={bookingQuest.length}
                                activeStep={activeStep}>
                                {bookingQuest.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                    labelProps.optional = <label variant="caption"></label>;
                                    }
                                    if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                    }
                                    return (
                                    <Step key={label} {...stepProps} style={{paddingLeft:"0"}} classes={{root: "block w-2.5 h-2.5 pl-0 bg-gray-200 rounded-full hover:bg-gray-400", alternativeLabel:"relative block w-2.5 h-2.5 bg-red ",completed:"block w-2.5 h-2.5 bg-main rounded-full hover:bg-main"}}>
                                        {/* <StepLabel {...labelProps} StepIconProps={{classes:{root: "block w-2.5 h-2.5 pl-0 bg-gray-200 rounded-full hover:bg-gray-400", active:"relative block w-2.5 h-2.5 bg-red ",completed:"block w-2.5 h-2.5 bg-main rounded-full hover:bg-main"}}}></StepLabel> */}
                                    </Step>
                                    );
                                })}
                            </Stepper>
                    </nav>
            </div>
            <div className="questions_wrapper mt-5 ml-4">
            {getStepContent(activeStep)}
            </div>

            <div className="fixed right-12 bottom-12 flex flex-wrap  gap-x-1 items-center justify-center">
                <button type="button" onClick={handleBack} className="text-main bg-white rounded px-5 py-2 grid text-md mr-3 shadow-md focus:outline-none hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                </button>
                <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg" disabled={answers[activeStep] === ""} onClick={handleNext}>
                    {activeStep === steps-1 ? 'Finish' : 'Next'}
                  </button>
            {/* <button className="text-white bg-main rounded px-16 py-2 text-sm shadow-md focus:outline-none hover:shadow-lg">Next</button> */}
            </div>
        </div>
        </>
    )
}
export default Questions