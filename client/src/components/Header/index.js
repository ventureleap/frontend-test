// Packages
import React, { useContext, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import classNames from "classnames"

// API
import { AuthContext } from "../../context/auth"

// Styles
import styles from "./Header.module.scss"

// Data
import siteData from "../../data/siteData"

const Header = () => {
    const { logoutUser } = useContext(AuthContext)
    const location = useLocation().pathname
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset >= 68) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        })
    })

    // Mobile menu
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header
            className={classNames(styles.Header, isScrolled && styles.Scrolled)}
        >
            <Link to="/apps/1" className={classNames(styles.Link, styles.Logo)}>
                {siteData.siteName}
            </Link>

            <button
                className={classNames(styles.Burger, isOpen && styles.BurgerOpen)}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
            >
                <span />
                <span />
                <span />
            </button>

            <nav className={classNames(styles.Nav, isOpen && styles.NavOpen)}>
                {/* Because NavLink component has bugs with SCSS modules, we're using regex instead */}
                <Link
                    to="/apps/1"
                    className={classNames(
                        styles.Link,
                        location.match(/^\/apps.*$/gim) && styles.Active
                    )}
                >
                    Homepage
                </Link>

                <Link
                    to="/dashboard"
                    className={classNames(
                        styles.Link,
                        location.match(/^\/dashboard.*$/gim) && styles.Active
                    )}
                >
                    Dashboard
                </Link>

                <button onClick={logoutUser} className={styles.Link}>
                    Log out
                </button>
            </nav>
        </header>
    )
}

export default Header
