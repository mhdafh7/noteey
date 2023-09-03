import Link from "next/link";

import { StarDark } from "@/components/Svgs/Abstract";
import LoginForm from "./form";

import styles from "./styles.module.scss";

const Login = () => {

  return (
    <>
      <span className={styles.titleWrapper}>
        <StarDark />
        <h2 className={styles.title}>Login</h2>
      </span>
      <div className={styles.card}>
        <LoginForm />
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
