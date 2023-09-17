import { Menu } from "react-feather";
import LogoutButton from "./LogoutButton";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <button className={styles.menuButton}>
        <Menu />
      </button>
      <div className={styles.logo}>Noteey</div>
      {/* TODO search */}
      <LogoutButton />
    </div>
  );
};
export default Header;
