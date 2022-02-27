// Packages
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
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

const Signup = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFirstName = e => setFirstName(e.target.value)
    const handleLastName = e => setLastName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit
    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { firstName, lastName, email, password }

        axios
            .post("/auth/signup", requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Signup" template="form">
            <h1>Create a new account</h1>

            <Form onSubmit={handleSubmit}>
                <Input
                    label="First name"
                    id="firstName"
                    onChange={handleFirstName}
                    value={firstName}
                />

                <Input
                    label="Last name"
                    id="lastName"
                    onChange={handleLastName}
                    value={lastName}
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    password
                    onChange={handlePassword}
                    value={password}
                    helper="Password needs to be at least 6 characters long, and contain one lowercase, one uppercase and one number."
                />

                <ButtonsContainer>
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Create an account
                    </Button>
                </ButtonsContainer>
            </Form>

            {errorMessage && <Alert>{errorMessage}</Alert>}

            <p>
                You already have an account? <Link to="/login">Login</Link>.
            </p>
        </Page>
    )
}

export default Signup
