"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { SignUpSchema } from "@/constants/formValidation";
import { messages } from "@/constants/messages";
import Spinner from "@/components/Spinner";

import styles from "./styles.module.scss";

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      const { confirmPassword, ...requiredValues } = values;
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(requiredValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      if (!res.ok) {
        toast.error((await res.json()).message);
        return;
      }
      toast.success(messages.auth.success.signup);
      signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(messages.auth.errors.signup);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="firstName">First Name</label>
            <Field
              type="text"
              name="firstName"
              id="firstName"
              className={styles.input}
            />
            <p className={styles.errorMessage}>
              <ErrorMessage name="firstName" />
            </p>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="lastName">Last Name</label>
            <Field
              type="text"
              name="lastName"
              id="lastName"
              className={styles.input}
            />
            <p className={styles.errorMessage}>
              <ErrorMessage name="lastName" />
            </p>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              className={styles.input}
            />
            <p className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </p>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              className={styles.input}
            />
            <p className={styles.errorMessage}>
              <ErrorMessage name="password" />
            </p>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={styles.input}
            />
            <p className={styles.errorMessage}>
              <ErrorMessage name="confirmPassword" />
            </p>
          </div>
          <button type="submit" className={styles.signupBtn}>
            {loading ? <Spinner scale={0.8} /> : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default SignUpForm;
