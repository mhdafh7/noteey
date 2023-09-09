"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import { GoogleLoginButton } from "./CustomLoginButtons";
import Spinner from "@/components/Spinner";
import { loginSchema } from "@/constants/formValidation";
import { messages } from "@/constants/messages";

import styles from "./styles.module.scss";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
        toast.success(messages.auth.success.login);
      } else {
        toast.error(messages.auth.errors.incorrect_credentials);
      }
    } catch (error) {
      console.error(error);
      toast.error(messages.auth.errors.login);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={loginSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className={styles.input} />
            <p className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </p>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className={styles.input} />
            <p className={styles.errorMessage}>
              <ErrorMessage name="password" />
            </p>
          </div>
          <button type="submit" className={styles.loginBtn}>
            {loading ? <Spinner scale={0.8} /> : "Login"}
          </button>
          <span className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.or}>
              <p>OR</p>
            </span>
          </span>
          <GoogleLoginButton callbackUrl={callbackUrl} />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
