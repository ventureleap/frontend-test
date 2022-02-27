// Packages
import React from "react"

// Styles
import styles from "./Form.module.scss"

const Form = props => {
    return (
        <form className={styles.Form} {...props}>
            {props.children}
        </form>
    )
}

export default Form
