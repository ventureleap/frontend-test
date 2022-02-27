// Packages
import React, { useState } from "react"

// Components
import InputContainer from "../InputContainer"
import Icon from "../../ui/Icon"

// Styles
import styles from "./Input.module.scss"

const Input = props => {
    const [isVisible, setIsVisible] = useState(false)

    return props.label || props.helper ? (
        <InputContainer label={props.label} helper={props.helper} id={props.id}>
            {props.password ? (
                <div className={styles.Password}>
                    <input
                        id={props.id}
                        type={isVisible ? "text" : "password"}
                        className={styles.Input}
                        {...props}
                    />

                    <button
                        className={styles.ButtonPassword}
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        <Icon name={isVisible ? "show" : "hide"} size={24} />
                    </button>
                </div>
            ) : (
                <input id={props.id} className={styles.Input} {...props} />
            )}
        </InputContainer>
    ) : props.password && !props.label && !props.helper ? (
        <div className={styles.Password}>
            <input
                id={props.id}
                type={isVisible ? "text" : "password"}
                className={styles.Input}
                {...props}
            />

            <button
                className={styles.ButtonPassword}
                type="button"
                onClick={() => setIsVisible(!isVisible)}
            >
                <Icon name={isVisible ? "show" : "hide"} />
            </button>
        </div>
    ) : (
        <input id={props.id} className={styles.Input} {...props} />
    )
}

export default Input
