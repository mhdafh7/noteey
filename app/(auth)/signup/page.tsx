"use client";

import Head from "next/head";
import Link from "next/link";
import { StarLight } from "@/components/Svgs/Abstract";
import styles from "./styles.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/constants/validation";
import { messages } from "@/constants/messages";
import { login } from "@/libs/api/auth";
import { toast } from "react-toastify";

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const router = useRouter();

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      await login(values);
      toast.success(messages.auth.success.login);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(messages.auth.errors.login);
    }
  };

  return (
    <>
      <Head>
        <title>Create an account</title>
        <meta
          name="description"
          content="A Note taking Web Application made using Nextjs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className={styles.titleWrapper}>
        <StarLight />
        <h2 className={styles.title}>Create an account</h2>
      </span>
      <div className={styles.card}>
        <Formik
          initialValues={{
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
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <h4 className={styles.loginText}>
        Already have an account?&nbsp;
        <span>
          <Link href={"/login"}>Login.</Link>
        </span>
      </h4>
    </>
  );
};
export default Signup;
