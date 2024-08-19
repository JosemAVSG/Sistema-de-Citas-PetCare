/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { isBefore, startOfToday, format } from "date-fns";
import turnstyles from "../styles/turnform.module.scss";

const AutoShowField = ({
    name,
    type,
    placeholder,
    showNextField,
    setShowNextField,
    className,
    availableTimes,
    options
  }) => {
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
      if (values[name]) {
        setShowNextField(true);
      }
    }, [values, name, setShowNextField]);
  
    if (name === "date") {
      const today = startOfToday();
      let footer = <p>please pick a date</p>;
      if (values.date) {
        footer = (
          <p className="font-bold ">
            you picked {format(values.date, "dd/MM/yyyy")}{" "}
          </p>
        );
      }
      const isDisabled = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6 || isBefore(date, today);
      };
      return (

        <div className={className}>
          <DayPicker
            mode="single"
            selected={values.date ? values.date : undefined}
            onSelect={(date) => {
              if (date && !isBefore(date, today)) {
                setFieldValue(name, date);
              }
            }}
            disabled={isDisabled}
            footer={footer}
          />
          <ErrorMessage name={name} />
        </div>
      );
    }
    if (name === "time") {
      return (
        <div className="w-full flex justify-center items-center">
        <div className="grid grid-cols-3 flex-col gap-4">
           {availableTimes.map((time) => (
            <button
              key={time}
              type="button"
              className={`py-2 px-4 rounded ${
                values.time === time
                  ? turnstyles.button_selected
                  : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
              onClick={() => setFieldValue("time", time)}
            >
              {time}
            </button>
          ))}
        </div>
        <ErrorMessage name="time" />
      </div>
      )
    }
    if(name === "description"){
      return (
        <div className="w-full">
        <h2 className="text-2xl font-bold text-center -mt-8 mb-8" >Elige un Servicio</h2>
        <div className="flex flex-row gap-2" >
          {options.map((op) => (
            <button
              key={op}
              type="button"
              className={`relative w-32 h-28  text-white font-bold "
              ${
                values.description === op
                  ? turnstyles.button_selected
                  : "bg-blue-500 text-white justify-center hover:bg-blue-700 "
              }`}
              onClick={() => setFieldValue("description", op)}
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                gridColumn: 'span 2',
              }} 
            >
              {op}
            </button>
          ))}
  
          
        </div>
        <ErrorMessage name="time" />
      </div>
        )
    }
    return (
      <div className={className}>
        <Field type={type} name={name} placeholder={placeholder} />
        <ErrorMessage name={name} />
      </div>
    );
  };

export default AutoShowField
