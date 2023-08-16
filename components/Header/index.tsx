import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { useAuth } from "../../context/AuthProvider";
import LoginIcon from "../Svgs/LoginIcon";
import { LogOut } from "react-feather";
import styles from "./styles.module.scss";

const Header = () => {
  // const { logOut, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // try {
    //   await logOut();
    //   router.push("/login");
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
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Noteey</div>
      {/* TODO search */}
      {/* <div className={styles.search}>search</div> */}
      <button className={styles.logOutBtn} onClick={handleLogout}>
        <p>Logout</p>
        <LogOut size={18}/>
      </button>
    </div>
  );
};
export default Header;
