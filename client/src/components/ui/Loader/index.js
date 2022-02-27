// Packages
import React from "react"
import classNames from "classnames"

// Styles
import styles from "./Loader.module.scss"

const Loader = props => {
    return (
        <div className="center">
            <span
                className={classNames(styles.Loader, props.full && styles.Full)}
                style={{
                    width: props.size || 24,
                    height: props.size || 24,
                    borderStyle: "solid",
                    borderWidth: props.border || 2,
                    borderColor: `var(--color-${
                        props.background || "light-gray"
                    })`,
                    borderBottomColor: `var(--color-${
                        props.color || "primary"
                    })`,
                }}
            />
        </div>
    )
}

export default Loader
