// Packages
import React from "react"

// Styles
import styles from "./TitleFlex.module.scss"

const TitleFlex = ({ children, ...props }) => {
    return (
        <div className={styles.Container} {...props}>
            {children}
        </div>
    )
}

export default TitleFlex
