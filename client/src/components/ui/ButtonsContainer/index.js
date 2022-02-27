// Packages
import React from "react"

// Styles
import styles from "./ButtonsContainer.module.scss"

const ButtonsContainer = ({ children, ...props }) => {
    return <div className={styles.Container} {...props}>{children}</div>
}

export default ButtonsContainer
