// Packages
import React from "react"

// Styles
import styles from "./ListContainer.module.scss"

const ListContainer = ({ children }) => {
    return <div className={styles.Container}>{children}</div>
}

export default ListContainer
