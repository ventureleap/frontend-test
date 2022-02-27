// Packages
import React, { useContext, useState, useEffect } from "react"

// API
import { AuthContext } from "../../context/auth"
import getAsync from "../../api/getAsync"

// Components
import Page from "../../components/layouts/Page"
import TitleFlex from "../../components/ui/TitleFlex"
import Button from "../../components/ui/Button"
import Breadcrumbs from "../../components/ui/Breadcrumbs"
import Loader from "../../components/ui/Loader"
import AppList from "../../components/applications/AppList"
import AppCard from "../../components/applications/AppCard"

const Dashboard = () => {
    const { user } = useContext(AuthContext)

    const breadcrumbsItems = [
        {
            text: "Dashboard",
        },
    ]

    // Get all user's apps
    const [userApps, setUserApps] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAsync("/apps/all-apps")
            .then(res => {
                setUserApps(res.filter(app => app.user._id === user._id))
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    return (
        <Page title="Dashboard">
            <TitleFlex>
                <h1>Hello {user.firstName}</h1>

                <Button variant="text" to="/dashboard/edit-account">
                    Edit your account
                </Button>
            </TitleFlex>

            <Breadcrumbs items={breadcrumbsItems} />

            <TitleFlex>
                <h2>Your apps</h2>

                <Button to="/apps/new-app" variant="primary">
                    Create a new app
                </Button>
            </TitleFlex>

            {isLoading ? (
                <Loader size={48} border={4} />
            ) : userApps.length > 0 ? (
                <AppList>
                    {userApps.map(app => (
                        <AppCard app={app} key={app._id} />
                    ))}
                </AppList>
            ) : (
                <p>You did not create any app yet.</p>
            )}
        </Page>
    )
}

export default Dashboard
