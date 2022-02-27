// Packages
import React from "react"

// Components
import InputContainer from "../InputContainer"

// Styles
import styles from "./Select.module.scss"

const Select = props => {
    return props.label || props.helper ? (
        <InputContainer label={props.label} helper={props.helper} id={props.id}>
            <div className={styles.Container}>
                <select className={styles.Select} id={props.id} {...props}>
                    {props.children}
                </select>
            </div>
        </InputContainer>
    ) : (
        <div className={styles.Container}>
            <select className={styles.Select} id={props.id} {...props}>
                {props.children}
            </select>
        </div>
    )
}

export default Select
