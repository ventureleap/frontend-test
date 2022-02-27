// Packages
import React, { useContext, useState } from "react"
import axios from "axios"

// API
import { AuthContext } from "../../../context/auth"

// Components
import TitleFlex from "../../ui/TitleFlex"
import ButtonsContainer from "../../ui/ButtonsContainer"
import IconButton from "../../ui/IconButton"
import Modal from "../../ui/Modal"
import Alert from "../../ui/Alert"
import Button from "../../ui/Button"

// Styles
import styles from "./AppCard.module.scss"

const AppCard = ({ app, ...props }) => {
    const { user } = useContext(AuthContext)

    const Item = props => {
        return (
            <p>
                <strong>{props.title}: </strong>
                {props.children}
            </p>
        )
    }

    // Modal
    const [isOpen, setIsOpen] = useState(false)

    // Delete app
    const handleDelete = () => {
        axios
            .delete(`/apps/delete-app/${app._id}`)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={styles.Container} {...props}>
                <TitleFlex>
                    <h5>{app.name}</h5>

                    {/* Only the user who created the app can edit or delete it */}
                    {app.user && user._id === app.user._id && (
                        <ButtonsContainer
                            style={{ marginLeft: "var(--spacer-xs)" }}
                        >
                            <IconButton
                                icon="edit"
                                variant="primary"
                                aria-label="Edit app"
                                to={`/apps/edit-app/${app._id}`}
                            />

                            <IconButton
                                icon="trash"
                                variant="danger"
                                aria-label="Delete app"
                                onClick={() => setIsOpen(true)}
                            />
                        </ButtonsContainer>
                    )}
                </TitleFlex>

                <Item title="Version">{app.version}</Item>

                <Item title="Lang">{app.lang}</Item>

                <Item title="Created by">
                    {!app.user
                        ? "Deleted user"
                        : `${app.user.firstName} ${app.user.lastName}`}
                </Item>
            </div>

            <Modal isOpen={isOpen}>
                <Alert modal>
                    <p>Are you sure you want to delete this app?</p>

                    <ButtonsContainer>
                        <Button variant="danger" onClick={handleDelete}>
                            Yes, delete this app
                        </Button>

                        <Button variant="text" onClick={() => setIsOpen(false)}>
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </>
    )
}

export default AppCard
