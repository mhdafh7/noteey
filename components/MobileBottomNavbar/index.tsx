import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { Plus } from "react-feather";
import styles from "./styles.module.scss";

const MobileBottomNavbar = () => {
  const { openModal, isOpen } = useContext(ModalContext);
  const handleClick = () => {
    openModal();
    console.log(isOpen);
  };
  return (
    <nav className={styles.container}>
      <button className={styles.FAB} onClick={handleClick}>
        <Plus size={36} />
      </button>
    </nav>
  );
};

export default MobileBottomNavbar;
