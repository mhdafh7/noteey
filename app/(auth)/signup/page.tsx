"use client";

import Head from "next/head";
import Link from "next/link";

import { StarLight } from "@/components/Svgs/Abstract";
import SignUpForm from "./form";

import styles from "./styles.module.scss";

const Signup = () => {
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
        <SignUpForm />
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
