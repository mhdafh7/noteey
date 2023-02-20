import Head from "next/head";
import Link from "next/link";
import { StarDark } from "../../components/Svgs/Abstract";
import SigninIcon from "../../components/Svgs/SigninIcon";
import styles from "./styles.module.scss";

const Login = () => {
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
        <SigninIcon />
      </span>
      <div className={styles.card}>
        <form className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className={styles.input} />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className={styles.input} />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
      <h4 className={styles.signUpText}>
        Don&apos;t have an account?&nbsp;
        <span>
          <Link href={"/signup"}>Sign up.</Link>
        </span>
      </h4>
      <h5 className={styles.branding}>Noteey</h5>
    </div>
  );
};
export default Login;
