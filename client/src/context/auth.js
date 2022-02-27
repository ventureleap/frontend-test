// Packages
import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

const AuthContext = createContext()

const AuthProviderWrapper = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const setToken = token => {
        localStorage.setItem("authToken", token)
        setIsLoggedIn(true)
    }

    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem("authToken")

        if (storedToken) {
            axios
                .get("/auth/verify", {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then(res => {
                    setUser(res.data)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyStoredToken()
    }, [])

    const loginUser = token => {
        localStorage.setItem("authToken", token)
        verifyStoredToken()
    }

    const logoutUser = () => {
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                loginUser,
                logoutUser,
                setToken,
                setUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }
