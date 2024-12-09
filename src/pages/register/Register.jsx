import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../components/header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosCongif from "../../axios/axiosConfig/AxiosConfig";
import toast from "react-hot-toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{11}$/, "Mobile number must be 11 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const registerMutation = useMutation({
    mutationFn: (values) =>
      axiosCongif.post("/api/auth/local/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        mobileNumber: values.mobileNumber,
      }),
    onSuccess: (data) => {
      toast.success("Registration successfully !", {
        style: {
          border: "1px solid #A88E5A",
          padding: "16px",
          color: "#A88E5A",
        },
        iconTheme: {
          primary: "#A88E5A",
          secondary: "#FFFAEE",
        },
      });
      console.log(data);
      sessionStorage.setItem("token", data.jwt);
      navigate("/");
      window.scrollTo(0, 0);
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.", {
        style: {
          border: "1px solid #A88E5A",
          padding: "16px",
          color: "#A88E5A",
        },
        iconTheme: {
          primary: "#A88E5A",
          secondary: "#FFFAEE",
        },
      });
    },
  });
  const initialValues = {
    username: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = (values , { setSubmitting }) => {
    registerMutation.mutate(values, {
     onError: () => {
       setSubmitting(false);
     }
    });
  };

  return (
    <div className="Register-page">
      <div className="contact-form-container px py">
        <Header headerTitle="Register" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="contact-form">
              <div className="form-group">
                <label htmlFor="username">
                  <h4>Name</h4>
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Your Name"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNumber">
                  <h4>Mobile Number</h4>
                </label>
                <Field
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Enter Mobile Number"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <h4>Email</h4>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <h4>Password</h4>
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <h4>Confirm Password</h4>
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="login-link">
          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
