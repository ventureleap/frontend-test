// Packages
import React, { useContext } from "react"
import { Navigate } from "react-router-dom"

// Components
import { AuthContext } from "../context/auth"

const ProtectedRoutes = ({ children, redirectTo }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) return <p>Is loading...</p>

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo ? redirectTo : "/login"} />
    )
}

export default ProtectedRoutes
