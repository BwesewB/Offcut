import styles from './navbar.module.css'

export default function Navbar() {

    return (
        <>
            <nav className={styles.navbar}>
                <img src="/icons/RocksLogoTransparent.svg" alt="Rocks Logo" className={styles.logo} />
            </nav>
        </>
    )
}