import Head from "next/head";
import Link from "next/link";
import { StarLight } from "../../components/Svgs/Abstract";
import SignupIcon from "../../components/Svgs/SignupIcon";
import styles from "./styles.module.scss";

const Signup = () => {
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
        <div className={styles.tape}></div>
        <form className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className={styles.input} />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className={styles.input} />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>
      </div>
      <h4 className={styles.loginText}>
        Already have an account?&nbsp;
        <span>
          <Link href={"/login"}>Login.</Link>
        </span>
      </h4>
      <h5 className={styles.branding}>Noteey</h5>
    </div>
  );
};
export default Signup;
