/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Formik, Form} from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createTurnAction } from "../redux/slices/turnSlice";
import "react-day-picker/dist/style.css";
import turnstyles from "../styles/turnform.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import AutoShowField from "./AutoShowField";
import Swal from 'sweetalert2';
const TurnsForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (values, { resetForm }) => {
    const finalValues = {
      ...formValues,
      ...values,
      userId,
    };
    dispatch(createTurnAction(finalValues));
    Swal.fire({title: "Turno Agregado", text: "Turno creado con exito", toast: true, position: "bottom-end", icon: "success", timer: 3000, allowEscapeKey: true,  stopKeydownPropagation: true }).then(() => {
      resetForm();
      setCurrentStep(1);
    })
  };
  const availableTimes = ["09:00","09:30", "10:00", "10:30" , "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"]; // Ejemplo de horas disponibles

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Formik
        initialValues={{ date: "", time: "", description: "" }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
                   <Form className="flex flex-row gap-14 justify-between bg-white rounded-lg p-6">
                   {currentStep === 1 && (
                     <>
                       <AutoShowField
                         type="date"
                         name="date"
                         placeholder="Date"
                         showNextField={false}
                         setShowNextField={() => {}}
                         className="w-full mb-4 flex justify-center items-center bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       />
                       {values.date && (
                         <AutoShowField
                           type="time"
                           name="time"
                           placeholder="Time"
                           showNextField={false}
                           setShowNextField={() => {}}
                           availableTimes={availableTimes}
                           className="w-full mb-4 flex justify-center items-center"
                         />
                       )}
                       {values.date && values.time && (
                         <button
                           className=" text-white font-bold py-2 px-4 rounded"
                           type="button"
                           onClick={() => setCurrentStep(2)}
                         >
                         Next<FontAwesomeIcon className="bg-blue-500 p-4 hover:bg-blue-700 rounded-full" icon={faArrowRight} />
                         </button>
                       )}
                     </>
                   )}
                   {currentStep === 2 && (
                     <>
                      <button
                         className=" h-10  text-white font-bold px-4 self-center "
                         type="button"
                         onClick={() => setCurrentStep(1)}
                       >
                         <FontAwesomeIcon className="bg-blue-500 p-4 hover:bg-blue-700 rounded-full " icon={faArrowLeft} />
                       </button>
                       <AutoShowField
                         type="select"
                         name="description"
                         placeholder="Description"
                         showNextField={false}
                         setShowNextField={() => {}}
                         className="w-full mb-4 flex justify-center items-center"
                         options={["Lunch", "Dinner", "Breakfast", "Other", "None"]}
                       />
                       <div className="flex justify-between self-end " >
                      
                       <button
                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                         type="submit"
                       >
                         Submit
                       </button>

                       </div>
                     </>
                   )}
                 </Form>
        )}
      </Formik>
    </div>
  );
};

export default TurnsForm;
