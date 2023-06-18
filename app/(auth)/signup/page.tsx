"use client";

import Head from "next/head";
import Link from "next/link";
import * as Yup from "yup";
import { StarLight } from "@/components/Svgs/Abstract";
import SignupIcon from "@/components/Svgs/SignupIcon";
import styles from "./styles.module.scss";
import passwordValidation from "@/libs/PasswordValidation";
// import { useAuth } from "@/context/AuthProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
  //   const { signUp } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.container}>
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
        <SignupIcon />
      </span>
      <div className={styles.card}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values: SignUpFormValues) => {
            // try {
            //   await signUp(values.email, values.password).then(() => {
            //     router.push("/");
            //     console.log("signed up");
            //   });
            // } catch (error) {
            //   let errorMessage = "error.unknown";
            //   if (typeof error === "string") {
            //     errorMessage = error.toUpperCase();
            //   } else if (error instanceof Error) {
            //     errorMessage = error.message;
            //   }
            //   toast.error(`Sign up error! ${errorMessage}`, {
            //     position: toast.POSITION.BOTTOM_CENTER,
            //     // autoClose: 3500,
            //     closeOnClick: true,
            //   });
            //   console.error(errorMessage);
            // }
          }}
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
      <h5 className={styles.branding}>Noteey</h5>
      <ToastContainer theme="colored" limit={3} />
    </div>
  );
};
export default Signup;
