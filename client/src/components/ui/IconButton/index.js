// Packages
import React from "react"
import classNames from "classnames"
import { Link } from "react-router-dom"

// Components
import Icon from "../Icon"

// Styles
import styles from "./IconButton.module.scss"

const IconButton = props => {
    return props.to ? (
        <Link
            to={props.to}
            className={classNames(styles.Button, styles[props.variant])}
            {...props}
        >
            <Icon name={props.icon} size={16} />
        </Link>
    ) : (
        <button
            className={classNames(styles.Button, styles[props.variant])}
            {...props}
        >
            <Icon name={props.icon} size={16} />
        </button>
    )
}

export default IconButton
