// Packages
import React from "react"
import HelmetMeta from "react-helmet"

// Data
import siteData from "../../data/siteData"

const Helmet = props => {
    return (
        <HelmetMeta>
            <title>
                {props.title} | {siteData.siteName}
            </title>
            <meta content="IE=edge" http-equiv="X-UA-Compatible" />
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />

            {/* Import font */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,900&display=swap"
                rel="stylesheet"
            />
        </HelmetMeta>
    )
}

export default Helmet
