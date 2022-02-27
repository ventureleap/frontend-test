// Packages
import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

// Routes
import routes from "./routes/routes"
import redirects from "./routes/redirects"

// Utils
import ProtectedRoutes from "./routes/ProtectedRoutes"
import AnonRoutes from "./routes/AnonRoutes"

const App = () => {
    // For updating user
    const [edited, setEdited] = useState(false)

    return (
        <Routes>
            {routes.map((route, i) => (
                <Route
                    path={route.path}
                    element={
                        route.protected ? (
                            <ProtectedRoutes>
                                <route.element
                                    edited={edited}
                                    setEdited={setEdited}
                                />
                            </ProtectedRoutes>
                        ) : route.anon ? (
                            <AnonRoutes>
                                <route.element />
                            </AnonRoutes>
                        ) : (
                            <route.element />
                        )
                    }
                    key={i}
                />
            ))}

            {redirects.map((route, i) => (
                <Route
                    path={route.path}
                    element={<Navigate to={route.to} />}
                    key={i}
                />
            ))}
        </Routes>
    )
}

export default App
