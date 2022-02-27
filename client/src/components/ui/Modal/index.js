// Packages
import React, { useEffect } from "react"
import classNames from "classnames"

// Styles
import styles from "./Modal.module.scss"

const Modal = props => {
    // Disable page scrolling when the modal is open
    useEffect(() => {
        props.isOpen
            ? window.document.body.classList.add("stop-scrolling")
            : window.document.body.classList.remove("stop-scrolling")
    }, [props.isOpen])

    return (
        <div
            className={classNames(
                styles.Container,
                props.isOpen && styles.Open
            )}
            {...props}
        >
            {props.children}
        </div>
    )
}

export default Modal
