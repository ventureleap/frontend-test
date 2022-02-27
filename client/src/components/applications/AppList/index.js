// Packages
import React from "react"

// Styles
import styles from "./AppList.module.scss"

const AppList = ({ children, ...props }) => {
    return (
        <div className={styles.Container} {...props}>
            {children}
        </div>
    )
}

export default AppList
