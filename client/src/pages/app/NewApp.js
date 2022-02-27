// Packages
import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// API
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import ButtonsContainer from "../../components/ui/ButtonsContainer"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import Breadcrumbs from "../../components/ui/Breadcrumbs"

const NewApp = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [name, setName] = useState("")
    const [version, setVersion] = useState(0.1)
    const [lang, setLang] = useState("")
    const [secret, setSecret] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

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
            user,
        }

        axios
            .post("/apps/new-app", requestBody)
            .then(() => {
                navigate(-1)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    const breadcrumbsItems = [
        {
            text: "Create a new app",
        },
    ]

    const back = () => navigate(-1)

    return (
        <Page title="Create a new app" template="form">
            <h1>Create a new app</h1>

            <Breadcrumbs items={breadcrumbsItems} />

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
        </Page>
    )
}

export default NewApp
