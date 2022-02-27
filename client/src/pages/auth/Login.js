// Packages
import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
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

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [email, setEmail] = useState("a@b.com")
    const [password, setPassword] = useState("Password42")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password }

        axios
            .post("/auth/login", requestBody)
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
        <Page title="Login" template="form">
            <h1>Log in</h1>

            <Form onSubmit={handleSubmit}>
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
                />

                <ButtonsContainer>
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Log in
                    </Button>
                </ButtonsContainer>
            </Form>

            {errorMessage && <Alert>{errorMessage}</Alert>}

            <p>
                You don't have an account? <Link to="/signup">Sign up</Link>.
            </p>
        </Page>
    )
}

export default Login
