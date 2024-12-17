import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../components/header/Header";
import { useMutation } from "@tanstack/react-query";
import axiosCongif from "../../axios/axiosConfig/AxiosConfig";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const response = await axiosCongif.post("/api/auth/local", {
        identifier: values.email,
        password: values.password,
        data: values,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Unexpected response status");
      }
    },

    onSuccess: (data) => {
      console.log(data.user.username);
      toast.success("Login successfully!", {
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
      sessionStorage.setItem("token", data.jwt);
      sessionStorage.setItem("username", data.user.username);
      
    },

    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.", {
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

  // Handle form submission
  const handleSubmit = (values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate("/");
        window.scrollTo(0, 0);
      },
    });
  };
  return (
    <div className="Register-page">
      <div className="contact-form-container px py">
        <Header headerTitle="Login" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="contact-form">
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
                <label htmlFor="name">
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

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="register-link">
          <p>
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
