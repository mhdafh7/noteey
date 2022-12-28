import Link from 'next/link';
import styles from './styles.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
      <div className={styles.card}>
        <div className={styles.tape}></div>
        <form className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className={styles.input}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={styles.loginBtn}
          >
            Login
          </button>
        </form>
      </div>
      <h4 className={styles.bottomText}>
        Don&apos;t have an account?&nbsp;
        <span>
          <Link href={'/signup'}>Sign up.</Link>
        </span>
      </h4>
    </div>
  );
};
export default Login;
