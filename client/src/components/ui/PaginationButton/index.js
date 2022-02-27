// Packages
import React from "react"
import classNames from "classnames"

// Components
import Icon from "../Icon"

// Styles
import styles from "./PaginationButton.module.scss"

const PaginationButton = props => {
    return (
        <button
            className={classNames(
                styles.Button,
                props.active && styles.Active,
                props.more && styles.More
            )}
            {...props}
        >
            {props.next || props.prev || props.more ? (
                <Icon
                    name={
                        props.next
                            ? "chevron-right"
                            : props.prev
                            ? "chevron-left"
                            : "more"
                    }
                    size={16}
                />
            ) : (
                props.number
            )}
        </button>
    )
}

export default PaginationButton
