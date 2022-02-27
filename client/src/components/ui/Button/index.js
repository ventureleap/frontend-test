// Packages
import React from "react"
import { Link } from "react-router-dom"
import classNames from "classnames"

// Styles
import styles from "./Button.module.scss"

const Button = props => {
    return props.to ? (
        <Link
            to={props.to}
            className={classNames(styles.Button, styles[`${props.variant}`])}
            {...props}
        >
            {props.children}
        </Link>
    ) : (
        <button
            className={classNames(styles.Button, styles[`${props.variant}`])}
            disabled={props.isLoading && true}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button
