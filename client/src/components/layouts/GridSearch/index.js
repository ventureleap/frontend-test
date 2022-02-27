// Packages
import React from "react"

// Styles
import styles from "./GridSearch.module.scss"

const GridSearch = props => {
    return <div className={styles.Container}>{props.children}</div>
}

export default GridSearch
