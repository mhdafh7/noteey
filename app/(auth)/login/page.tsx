"use client";

import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { StarDark } from "@/components/Svgs/Abstract";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { login } from "@/libs/api/auth";
import { messages } from "@/constants/messages";
import { loginSchema } from "@/constants/validation";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
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
      <span className={styles.titleWrapper}>
        <StarDark />
        <h2 className={styles.title}>Login</h2>
      </span>
      <div className={styles.card}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={loginSchema}
        >
          {({ errors, touched, isSubmitting }) => (
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
                <Field
                  type="password"
                  name="password"
                  className={styles.input}
                />
                <p className={styles.errorMessage}>
                  <ErrorMessage name="password" />
                </p>
              </div>
              <button type="submit" className={styles.loginBtn}>
                {isSubmitting ? <Spinner scale={0.8} /> : <p>Login</p>}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <h4 className={styles.signUpText}>
        Don&apos;t have an account?&nbsp;
        <span>
          <Link href={"/signup"}>Sign up.</Link>
        </span>
      </h4>
    </>
  );
};
export default Login;
