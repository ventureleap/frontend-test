// Packages
import React from "react"
import classNames from "classnames"

// Styles
import stylesContainer from "./Container.module.scss"
import stylesWrapper from "./Wrapper.module.scss"

const Container = props => {
    return <main className={stylesContainer.Container}>{props.children}</main>
}

const Wrapper = props => {
    return (
        <div
            className={classNames(
                stylesWrapper.Wrapper,
                stylesWrapper[`${props.template}`]
            )}
        >
            {props.children}
        </div>
    )
}

export { Container, Wrapper }
