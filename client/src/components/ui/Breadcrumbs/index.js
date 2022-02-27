// Packages
import React from "react"
import { Link } from "react-router-dom"

// Styles
import styles from "./Breadcrumbs.module.scss"

const Breadcrumbs = props => {
    return (
        <p className={styles.Container}>
            {/* Because it makes no sense to have breadcrumbs on the homepage, the link to homepage is always visible */}
            <Link to="/apps/1">Homepage</Link>

            {props.items.map((item, i) =>
                item.url ? (
                    <Link to={item.url} key={i}>
                        {item.text}
                    </Link>
                ) : (
                    <p>{item.text}</p>
                )
            )}
        </p>
    )
}

export default Breadcrumbs
