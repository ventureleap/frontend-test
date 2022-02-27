// Packages
import React from "react"
import { Link } from "react-router-dom"

// Components
import Page from "../components/layouts/Page"
import Breadcrumbs from "../components/ui/Breadcrumbs"

const NotFound = () => {
    const breadcrumbsItems = [
        {
            text: "404",
        },
    ]
    return (
        <Page title="Page not found">
            <h1>Page not found!</h1>

            <Breadcrumbs items={breadcrumbsItems} />

            <p>
                <Link to="/apps/">Back to homepage</Link>.
            </p>
        </Page>
    )
}

export default NotFound
