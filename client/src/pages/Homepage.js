// Packages
import React, { useState, useEffect } from "react"

// API
import getAsync from "../api/getAsync"

// Components
import Page from "../components/layouts/Page"
import TitleFlex from "../components/ui/TitleFlex"
import Button from "../components/ui/Button"
import GridSearch from "../components/layouts/GridSearch"
import Search from "../components/Search"
import ListContainer from "../components/applications/ListContainer"
import Loader from "../components/ui/Loader"
import AppList from "../components/applications/AppList"
import AppCard from "../components/applications/AppCard"
import Pagination from "../components/ui/Pagination"

const Homepage = () => {
    // Get all apps
    const [allApps, setAllApps] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Pagination
    const dataLimit = 30 // Set number of items per page
    const pageLimit = 5 // Set maximum number of pages shown in pagination
    const [currentPage, setCurrentPage] = useState()
    const [totalPages, setTotalPages] = useState()

    // Search items
    const [allAuthors, setAllAuthors] = useState([])
    const [allLangs, setAllLangs] = useState([])
    const [valueSearchName, setValueSearchName] = useState("")
    const [valueSearchAuthor, setValueSearchAuthor] = useState("all")
    const [valueSearchLang, setValueSearchLang] = useState("all")

    // Set data
    useEffect(() => {
        getAsync("/apps/all-apps")
            .then(res => {
                setAllApps(res)
                setAllAuthors([
                    ...new Set(
                        res
                            .map(
                                app =>
                                    `${app.user.firstName} ${app.user.lastName}`
                            )
                            .sort()
                    ),
                ])
                setAllLangs([...new Set(res.map(app => app.lang).sort())])
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        setCurrentPage(parseInt(window.location.href.split("/")[4]))
    }, [])

    // Search functions
    const handleSearchName = e => setValueSearchName(e.target.value)
    const handleSearchAuthor = e => setValueSearchAuthor(e.target.value)
    const handleSearchLang = e => setValueSearchLang(e.target.value)

    let results = allApps.filter(app =>
        app.name.toLowerCase().includes(valueSearchName.toLowerCase())
    )

    if (valueSearchAuthor !== "all") {
        results = results.filter(
            app =>
                `${app.user.firstName} ${app.user.lastName}` ===
                valueSearchAuthor
        )
    }

    if (valueSearchLang !== "all") {
        results = results.filter(app => app.lang === valueSearchLang)
    }

    // Get data for pagination
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results.slice(startIndex, endIndex)
    }

    useEffect(() => {
        setTotalPages(Math.ceil(results.length / dataLimit))
    }, [results.length])

    const handleReset = () => {
        setValueSearchName("")
        setValueSearchAuthor("all")
        setValueSearchLang("all")
    }

    console.log(results.length)

    return (
        <Page title="Homepage" template="full">
            <TitleFlex>
                <h1>All applications</h1>

                <Button variant="primary" to="/apps/new-app">
                    Add a new app
                </Button>
            </TitleFlex>

            {isLoading ? (
                <Loader size={48} border={4} />
            ) : (
                <GridSearch>
                    <Search
                        authors={allAuthors}
                        langs={allLangs}
                        searchName={handleSearchName}
                        valueSearchName={valueSearchName}
                        searchAuthor={handleSearchAuthor}
                        valueSearchAuthor={valueSearchAuthor}
                        searchLang={handleSearchLang}
                        valueSearchLang={valueSearchLang}
                        handleReset={handleReset}
                    />

                    <ListContainer>
                        {results.length === 0 ? (
                            <p>Your search did not return any results.</p>
                        ) : allApps.length > 0 ? (
                            <AppList>
                                {getPaginatedData().map(app => (
                                    <AppCard app={app} key={app._id} />
                                ))}
                            </AppList>
                        ) : (
                            <p>No app yet.</p>
                        )}

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                data={allApps}
                                totalPages={totalPages}
                                dataLimit={dataLimit}
                                pageLimit={pageLimit}
                            />
                        )}
                    </ListContainer>
                </GridSearch>
            )}
        </Page>
    )
}

export default Homepage
