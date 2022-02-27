// Packages
import React from "react"

// Styles
import styles from "./InputContainer.module.scss"

const InputContainer = props => {
    return (
        <div className={styles.Container}>
            {props.label && (
                <label htmlFor={props.id} className={styles.Label}>
                    {props.label}
                </label>
            )}

            {props.children}

            {props.helper && <small className={styles.Helper}>{props.helper}</small>}
        </div>
    )
}

export default InputContainer
