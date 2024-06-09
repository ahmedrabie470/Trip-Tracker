
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from 'react-datepicker'
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateTrip() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  let {id} = useParams()

  async function submitTrip(values) {
    const userToken = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:3000/updateTrip/${id}`,
        values,
        {
          headers: {
            token: userToken,
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      navigate("/profile");
    } catch (err) {
      setIsLoading(false);

       if (err.response.status === 409) {
        setError("Error verifying token. You must be logged in.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  }

  const tripSchema = yup.object({
    origin: yup
      .string()
      .min(3, "origin must be at least 3 characters ")
      .max(100, "origin must be at most 10 characters ")
      .required("origin is required"),
    destination: yup
      .string()
      .min(3, "destination must be at least 3 characters ")
      .max(100, "destination must be at most 100 characters ")
      .required("destination is required"),
    status: yup
      .string()
      .min(3, "status must be at least 3 characters ")
      .max(50, "status must be at most 50 characters ")
      .required("status is required"),
      startDate: yup.date().required("Start date is required"),
      endDate: yup.date().required("End date is required"),
  });
  let formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      status: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: tripSchema,
    onSubmit: submitTrip,
  });
  return (
    <>
   {error?<div>{error}</div> : ""}
  <div className="home">
      <div className="layer">
    <div className="w-50  rounded-4 mx-auto">

      
        <form  onSubmit={formik.handleSubmit}>
        <div >
        <h3 className="head pt-5">Update Your Trip </h3>
          <label className="text-white" htmlFor=" TripOrigin"> Trip origin</label>
          <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.origin}             
            className="form-control  rounded-5 "
            name="origin"
            type="text"
            placeholder="Type Your Current Location"
          />
 {formik.errors.origin && formik.touched.origin ? (
                <div className="alert alert-dark   mt-2">
                  {formik.errors.origin}
                </div>
              ) : (
                ""
              )}
         
          <label className="text-white mt-3" htmlFor="destination" >
            {" "}
            Trip Destination
          </label>
          <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.destination}             
            className="form-control  rounded-5 "
            name="destination"
            type="text"
            placeholder="Type Your Trip Destination"
          />
          {formik.errors.destination && formik.touched.destination ? (
                <div className="alert alert-dark   mt-2">
                  {formik.errors.destination}
                </div>
              ) : (
                ""
              )}
        
          <h5 className="mt-2 text-white">Trip Status</h5>

          <select
            as="select"
            className="form-select  fa-i-cursor"
            aria-label="Disabled select example"
            id="status"
            name="status"
           
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}  >
            <option value="">Select a status</option>
            <option value="scheduled">scheduled</option>
            <option value="in_progress">in_progress</option>
            <option value="completed">completed</option>
          
          </select>
          {formik.errors.status && formik.touched.status ? (
                <div className="alert alert-dark   mt-2">
                  {formik.errors.status}
                </div>
              ) : (
                ""
              )}
              <div className="d-flex mt-4 align-items-center">
              <label className="text-white mx-2" htmlFor="startDate" >
                  {" "}
                  Start Date
                </label>
                <DatePicker
                  selected={formik.values.startDate}
                  onChange={date => formik.setFieldValue('startDate', date)}
                  className="form-control rounded-5"
                  dateFormat="yyyy-MM-dd"
                  name="startDate"
                />
                {formik.errors.startDate && formik.touched.startDate ? (
                <div className="alert alert-dark   mt-2">
                  {formik.errors.startDate}
                </div>
              ) : (
                ""
              )}
                <label className="text-white mx-2" htmlFor="endDate" >
                  {" "}
                  End Date
                </label>
                <DatePicker
                  selected={formik.values.endDate}
                  onChange={date => formik.setFieldValue('endDate', date)}
                  className="form-control rounded-5"
                  dateFormat="yyyy-MM-dd"
                  name="endDate"
                />
               {formik.errors.endDate && formik.touched.endDate ? (
                <div className="alert alert-dark   mt-2">
                  {formik.errors.endDate}
                </div>
              ) : (
                ""
              )}
              </div>
              
           {isLoading ? (
                <>
                  <button className="btn mt-3  secondary text-center text-white">
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                </>
              ) : (
                <button
                type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="btn btn-success mt-3  secondary text-center text-white"
                >
                  Update {">"}{" "}
                </button>
              )}

      </div>
   
         
         
        </form>

        <div>
          
   
    </div>
      </div>
    </div>
    </div> 
    </>
  );
}
