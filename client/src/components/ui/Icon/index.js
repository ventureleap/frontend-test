// Packages
import React from "react"
import { ReactSVG } from "react-svg"

// Styles
import styles from "./Icon.module.scss"

const Icon = props => {
    return (
        <ReactSVG
            className={styles.Icon}
            src={`/icons/${props.name}.svg`}
            style={{
                color: props.color || "currentcolor",
                width: props.size,
                height: props.size,
            }}
            wrapper="span"
            {...props}
        />
    )
}

export default Icon
