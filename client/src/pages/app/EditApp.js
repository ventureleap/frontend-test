// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// API
import getAsync from "../../api/getAsync"

// Components
import Page from "../../components/layouts/Page"
import Loader from "../../components/ui/Loader"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import ButtonsContainer from "../../components/ui/ButtonsContainer"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import Breadcrumbs from "../../components/ui/Breadcrumbs"

const EditApp = props => {
    const navigate = useNavigate()

    // Get the app to edit
    const [app, setApp] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const id = window.location.href.split("/")[5]

    // Form items
    const [name, setName] = useState("")
    const [version, setVersion] = useState(0.1)
    const [lang, setLang] = useState("")
    const [secret, setSecret] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Get the app and values for form items
    useEffect(() => {
        getAsync(`/apps/app/${id}`)
            .then(res => {
                setApp(res)
                setName(res.name)
                setVersion(res.version)
                setLang(res.lang)
                setSecret(res.secret)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Form handles
    const handleName = e => setName(e.target.value)
    const handleVersion = e => setVersion(e.target.value)
    const handleLang = e => setLang(e.target.value)
    const handleSecret = e => setSecret(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            name,
            version,
            lang,
            secret,
        }

        axios
            .put(`/apps/edit-app/${app._id}`, requestBody)
            .then(() => {
                navigate(-1)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Breadcrumbs items
    const breadcrumbsItems = [
        {
            text: `Edit ${isLoading ? "App" : app.name}`,
        },
    ]

    const back = () => navigate(-1)

    return (
        <Page title={`Edit ${isLoading ? "App" : app.name}`} template="form">
            <h1>Edit {isLoading ? "App" : app.name}</h1>

            <Breadcrumbs items={breadcrumbsItems} />

            {isLoading ? (
                <Loader size={48} border={4} />
            ) : (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            label="App name"
                            id="name"
                            onChange={handleName}
                            value={name}
                        />

                        <Input
                            label="Version"
                            id="version"
                            type="number"
                            step={0.1}
                            onChange={handleVersion}
                            value={version}
                        />

                        <Input
                            label="Language"
                            id="lang"
                            onChange={handleLang}
                            value={lang}
                        />

                        <Input
                            label="Secret phrase"
                            id="secret"
                            onChange={handleSecret}
                            value={secret}
                        />

                        <ButtonsContainer>
                            <Button type="submit" variant="primary">
                                Create a new app
                            </Button>

                            <Button onClick={back} variant="text">
                                Cancel
                            </Button>
                        </ButtonsContainer>
                    </Form>

                    {errorMessage && <Alert>{errorMessage}</Alert>}
                </>
            )}
        </Page>
    )
}

export default EditApp
