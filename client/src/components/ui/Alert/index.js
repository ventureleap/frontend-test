// Packages
import React from "react"
import classNames from "classnames"

// Styles
import styles from "./Alert.module.scss"

const Alert = ({ children, ...props }) => {
    return props.modal ? (
        <div className={classNames(styles.Container, styles.Modal)}>
            {children}
        </div>
    ) : (
        <p className={styles.Container}>{children}</p>
    )
}

export default Alert
