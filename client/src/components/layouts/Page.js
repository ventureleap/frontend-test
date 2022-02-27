// Packages
import React, { useContext } from "react"

// API
import { AuthContext } from "../../context/auth"

// Components
import Helmet from "./Helmet"
import Header from "../Header"
import { Wrapper, Container } from "./Container"

const Page = props => {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <>
            <Helmet title={props.title} />

            {isLoggedIn && <Header />}

            <Wrapper template={props.template}>
                <Container>{props.children}</Container>
            </Wrapper>
        </>
    )
}

export default Page
