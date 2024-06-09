import React, {  useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToken } from "../../Redux/userTokenSlice";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  async function submitForm(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post("http://localhost:3000/login", values);
      setIsLoading(false);
      dispatch(updateToken(data.token));
      navigate("/home");
    } catch (err) {
      setIsLoading(false);
      if (err.response.status === 409) {
        setErrors("Incorrect Email Or Password");
      }
    }
  }
  const validationSchema = yup.object({
    email: yup.string().email("email  Invalid").required("email required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
        "Minimum five characters, at least one letter and one number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
              <h1 className="text-light">Welcome to TripTracker</h1>
              <h5 className="text-light mt-4"> Sign in to your account</h5>
              <form className="form-outline" onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                  <label className="text-light" htmlFor="email">
                    Email
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="email"
                    id="email"
                    className="form-control  w-100 mb-3 "
                    placeholder="Type your email address"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert alert-dark w-100 mt-2">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}

                  <label className="text-light" htmlFor="password">
                    Password
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    id="password"
                    className="form-control w-100 mb-3 "
                    placeholder="Type your password address"
                  />

                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-dark w-100 mt-2">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
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
                      Sign In Now {">"}{" "}
                    </button>
                  )}
                </div>
              </form>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
