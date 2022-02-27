// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

// API
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import ButtonsContainer from "../../components/ui/ButtonsContainer"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import Modal from "../../components/ui/Modal"

const EditAccount = ({ edited, setEdited }) => {
    const { user, setUser, setToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFirstName = e => setFirstName(e.target.value)
    const handleLastName = e => setLastName(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            // To keep all data inside the user object
            firstName,
            lastName,
            email: user.email,
            _id: user._id,
        }

        axios
            .put(`/users/edit/${user._id}`, requestBody)
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

    // Delete user
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDelete = e => {
        e.preventDefault()

        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logoutUser()
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit your account" template="form">
            <h1>Edit your account</h1>

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
                    disabled
                    value={user.email}
                    helper="You can not edit your email"
                />

                <ButtonsContainer>
                    <Button type="submit" variant="primary">
                        Save changes
                    </Button>

                    <Button to="/apps/" variant="text">
                        Cancel
                    </Button>
                </ButtonsContainer>
            </Form>

            {errorMessage && <Alert>{errorMessage}</Alert>}

            <p>
                <Link to="/dashboard/edit-password">Edit your password</Link>
            </p>

            <Button variant="danger" onClick={() => setIsModalOpen(true)}>
                Delete your account
            </Button>

            <Modal isOpen={isModalOpen}>
                <Alert modal>
                    <p>Are you sure you want to delete your account?</p>

                    <ButtonsContainer>
                        <Button variant="danger" onClick={handleDelete}>
                            Yes, delete my account
                        </Button>

                        <Button
                            variant="text"
                            onClick={() => setIsModalOpen(false)}
                        >
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </Page>
    )
}

export default EditAccount
