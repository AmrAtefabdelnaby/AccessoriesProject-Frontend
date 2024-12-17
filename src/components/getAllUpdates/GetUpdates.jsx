import React from "react";
import { Field, Form, Formik } from "formik";
import { FaRegPaperPlane } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function GetUpdates() {
  const GetUpdates = useMutation({
    mutationFn: (email) => axiosConfig.post("/api/get-updates", { data: { userEmail: email } }),
    onSuccess: () => {
      toast.success("Email sent successfully", {
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
    onError: () => {
      toast.error(`Error sending email`, {
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

  const handleSubmit = (values, { resetForm }) => {
    GetUpdates.mutate(values.email);
    resetForm();
  };

  return (
    <div className="get-updates py px">
      <div className="inner-container">
        <h1>Get Updates</h1>
        <p>Send us an email to get the latest updates and offers from us.</p>
      </div>

      <Formik
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        })}
      >
        {({ errors }) => (
          <Form action="submit" className="form-section">
            <div className="input-container">
              <Field
                className="input-field"
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <button type="submit" className="btn">
              <FaRegPaperPlane />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
