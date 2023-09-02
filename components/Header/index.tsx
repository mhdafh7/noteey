import LogoutButton from "./LogoutButton";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Noteey</div>
      {/* TODO search */}
      <LogoutButton />
    </div>
  );
};
export default Header;
