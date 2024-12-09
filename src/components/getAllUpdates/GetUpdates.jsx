import React from "react";
import { Field, Form, Formik } from "formik";
import { FaRegPaperPlane } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";

export default function GetUpdates() {
  const GetUpdates = useMutation({
    mutationFn: (email) => axiosConfig.post("/api/get-updates", { data: { userEmail: email } }),
    onSuccess: () => {
      alert("Email sent successfully");
    },
    onError: (error) => {
      alert(`Error sending email: ${error.message}`);
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
      >
        {({ errors, touched }) => (
          <Form action="submit" className="form-section">
            <div className="input-container">
              <Field
                className="input-field"
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && touched.email && (
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
