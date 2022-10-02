import styles from "../styles/Header.module.scss"

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Noteey</div>
            {/* TODO search */}
            {/* <div className={styles.search}>search</div> */}
        </div>
    )
}
export default Header
