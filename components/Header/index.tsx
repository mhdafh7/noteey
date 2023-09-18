import DrawerButton from "./DrawerButton";
import LogoutButton from "./LogoutButton";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <DrawerButton />
        <div className={styles.logo}>Noteey</div>
        {/* TODO search */}
        <LogoutButton />
      </header>
    </>
  );
};
export default Header;
