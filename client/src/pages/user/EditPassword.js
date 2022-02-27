// Packages
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// API
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import ButtonsContainer from "../../components/ui/ButtonsContainer"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"

const EditPassword = ({ edited, setEdited }) => {
    const { user, setUser, setToken } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
            password,
        }

        axios
            .put(`/users/edit-password/${user._id}`, requestBody)
            .then(res => {
                const { token, user } = res.data
                setUser(user)
                setToken(token)
                setEdited(!edited)
                navigate("/dashboard")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Edit your password" template="form">
            <h1>Edit your password</h1>

            <Form onSubmit={handleSubmit}>
                <Input
                    label="New password"
                    id="password"
                    password
                    onChange={handlePassword}
                    value={password}
                />

                <ButtonsContainer>
                    <Button type="submit" variant="primary">
                        Save changes
                    </Button>

                    <Button to="/dashboard" variant="text">Cancel</Button>
                </ButtonsContainer>
            </Form>

            {errorMessage && <Alert>{errorMessage}</Alert>}
        </Page>
    )
}

export default EditPassword
