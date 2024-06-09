import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {


  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()
  
  async function submitForm(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post("http://localhost:3000/register", values);
      if (data.message === "success") {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (err) {
      if (err.response.status === 404) {
        setIsLoading(false);
        setErrors("Email already exists. Please use a different email.");
      }
    }
  }

  

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, "username must be at least 3 characters ")
      .max(20, "username must be at most 10 characters ")
      .required("username is required"),
    email: yup.string().email("email  Invalid").required("email required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
        "Minimum five characters, at least one letter and one number"
      ),
    Repassword: yup
      .string()
      .oneOf(["password"])
      .oneOf([yup.ref("password ")], " password and RePassword doesn't match")
      .required("RePassword required"),
    
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      Repassword: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });


  return (
    <>
   <div className="home">
        <div className="layer  d-flex animate__animated  animate__fadeIn justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center ">
            <div>
              {errors != null ? (
                <>
                  <div className="alert alert-dark w-100">{errors}</div>
                </>
              ) : (
                ""
              )}
              <h1 className="text-light">
                Join the CookMate
                <br />
                Community!
              </h1>
              <h6 className="text-light mb-4">Create your account</h6>
              <form
                className="form-outline"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group ">
                  <label className="text-light" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control mb-3 w-100 "
                    placeholder="Type your name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {formik.errors.username &&
                  formik.touched.username ? (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.username}
                    </div>
                  ) : (
                    ""
                  )}

                  <label className="text-light" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control w-100 mb-3 "
                    placeholder="Type your email address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert alert-dark  w-100 mt-2">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                  <label className="text-light" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control w-100 mb-3 "
                    placeholder="Type your password address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password &&
                  formik.touched.password ? (
                    <div className="alert alert-dark  w-100 mt-2">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                  <label className="text-light" htmlFor="Repassword">Repassword</label>
                  <input
                    type="Repassword"
                    id="Repassword"
                    className="form-control w-100 mb-3"
                    placeholder="Type your Repassword address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Repassword}
                  />
                  {formik.errors.Repassword &&
                  formik.touched.Repassword ? (
                    <div className="alert alert-dark  w-100 mt-2">
                      {formik.errors.Repassword}
                    </div>
                  ) : (
                    ""
                  )}

                  <p className="my-3 text-light">
                    By signing up , you agree to our Terms <br /> and
                    Conditions.{" "}
                  </p>
                  {isLoading ? (
                    <button className="btn secondary text-white px-5">
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark w-100 secondary px-5 rounded-4 text-white"
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      {" "}
                      Create New {">"}{" "}
                    </button>
                  )}

                  <div className="mt-2">
                    <Link
                      to="/login"
                      className="mt-3 text-light text-decoration-none"
                    >
                      {" "}
                      Already have account ?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>    </>
  );
}
