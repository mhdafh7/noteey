"use client";

import Head from "next/head";
import Link from "next/link";
import * as Yup from "yup";
// import { useAuth } from "@/context/AuthProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { StarDark } from "@/components/Svgs/Abstract";
import styles from "./styles.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8).max(200),
});
const Login = () => {
  // const { signIn, loading, setLoading, user } = useAuth();
  const router = useRouter();

  // if (user) {
  //   console.log("Already signed in!!");
  //   router.push("/");
  //   return null;
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="A Note taking Web Application made using Nextjs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          onSubmit={async (values: SignInFormValues) => {
            // try {
            //   setLoading(true);
            //   await signIn(values.email, values.password).then(() => {
            //     setLoading(false);
            //     router.push("/");
            //     console.log("signed in");
            //   });
            // } catch (error) {
            //   let errorMessage = "error.unknown";
            //   if (typeof error === "string") {
            //     errorMessage = error.toUpperCase();
            //   } else if (error instanceof Error) {
            //     errorMessage = error.message;
            //   }
            //   toast.error(`Sign in error! ${errorMessage}`, {
            //     position: toast.POSITION.BOTTOM_CENTER,
            //     closeOnClick: true,
            //   });
            //   console.error(errorMessage);
            // }
          }}
          validationSchema={SignInSchema}
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
                {/* {loading ? <Spinner scale={0.8} /> : <p>Login</p>} */}
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
      <h5 className={styles.branding}>Noteey</h5>
      <ToastContainer theme="colored" limit={3} />
    </div>
  );
};
export default Login;
