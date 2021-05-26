import React, { useState, useEffect } from "react";
import {Stepper, Step, StepLabel, Button, Container, TextField, FormControlLabel, Checkbox, RadioGroup, Radio, Modal } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import {selectStep} from '../../Store/Actions';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

export default function BookingInfo() {
  const bookingInfo = useSelector((state) => state.booking.questions)
  const bookingService = useSelector((state) => state.booking.selectedService)
  const bookingStaff = useSelector((state) => state.booking.selectedProfessional)
  const bookingDate = useSelector((state) => state.booking.selectedDate)
  const bookingSlot = useSelector((state) => state.booking.selectedSlot)
  const bookingStat = useSelector((state) => state.booking.bookingStatus)
  const dispatch = useDispatch()
  const history = useHistory();

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
        return (<div>
          <h3 className="booking-info-header-h3">{bookingInfo[step].question} <span className="helper-text">(Type some text)</span></h3>
        <TextField
              className="booking-info-multiline"
              placeholder="Please Describe"
              multiline
              type="text"
              value={answers[step] || ""}
              onChange={handleChange}
              InputProps={{ disableUnderline: true}}
          />
        </div>)
      } else if (bookingInfo[step].type == 2) {
        return (<div>
          <h3 className="booking-info-header-h3">{bookingInfo[step].question}<span className="helper-text">(Select 1 option minimum)</span></h3>
          {bookingInfo[step].answers.map(answer =>
        <FormControlLabel key={answer.id} className="booking-info-checkbox"
                      control={<Checkbox name={answer.name} value={answer.id} onChange={handleCheckboxChange} />} 
                      label={<div><h5>{answer.answer}</h5><p>This is an additional message</p></div>}
                  />)}
        </div>)
      } else if (bookingInfo[step].type == 3) {
        return (<div>
          <h3 className="booking-info-header-h3">{bookingInfo[step].question}<span className="helper-text">(Select 1 option)</span></h3>
         <RadioGroup className="booking-info-radio" aria-label="multi" name="multi1" value={Number(answers[step])} onChange={handleChange}>
          {bookingInfo[step].answers.map(answer => <FormControlLabel key={answer.answer} value={Number(answer.id)} control={<Radio />} label={<div><h5>{answer.answer}</h5></div>} />)}
        </RadioGroup>
        </div>)
      }
  }
  return (
    <div className="booking-info-wrapper">
      <Container maxWidth="lg">
      <div className="stepper-header-row">
        <h1 className="stepper-header-title">Tell us more about yourself.</h1>
        {/* {bookingSlot ? bookingSlot : "nothing"} */}
        <Stepper 
        steps={bookingInfo.length+3}
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
              <Step key={label} {...stepProps} className="step-styles">
                <StepLabel {...labelProps}></StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      <div>
         
          <div className="booking-info-content-wrapper">
            <div className="booking-info-content-block">
              {getStepContent(activeStep)}
            </div>
              <div className="booking-info-btn-group">
              <Button className="btn-plain" 
              // disabled={activeStep === 0} 
              onClick={handleBack}>
                Previous
              </Button>
                  {/* {isStepOptional(activeStep) && (
                  <Button className="btn-plain" onClick={handleSkip}>
                      Skip
                  </Button>)} */}
                  <Button className="btn-secondary" disabled={answers[activeStep] == ""} onClick={handleNext}>
                    {activeStep === steps-1 ? 'Finish' : 'Next'}
                  </Button>
              </div>
          </div>
        
      </div>
      {/* {!accState.loggedIn && <Modal className="login-register-modal-wrapper"
            open={open}
            onClose={handleClose}
            aria-labelledby="login-register-modal"
            aria-describedby="login-register-description"
            >
              <div className="modal-outer">
                <LoginModal open={open} handleClose={handleClose}/>
                  <div className="login-modal-common">
                      <div className="login-register-switcher">{ <LoginText /> }</div>
                  </div>
              </div>
        </Modal>} */}
      </Container>
    </div>
  );
}