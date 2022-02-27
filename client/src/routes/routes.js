// Pages
import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

// Auth
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"

// App
import NewApp from "../pages/app/NewApp"
import EditApp from "../pages/app/EditApp"

// User
import Dashboard from "../pages/user/Dashboard"
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

// Routes
const routes = [
    {
        path: "/apps/:pageNumber",
        element: Homepage,
        protected: true,
        anon: false,
    },
    {
        path: "*",
        element: NotFound,
        protected: false,
        anon: false,
    },

    // Auth
    {
        path: "/signup",
        element: Signup,
        protected: false,
        anon: true,
    },
    {
        path: "/login",
        element: Login,
        protected: false,
        anon: true,
    },

    // App
    {
        path: "/apps/new-app",
        element: NewApp,
        protected: true,
        anon: false,
    },
    {
        path: "/apps/edit-app/:id",
        element: EditApp,
        protected: true,
        anon: false,
    },

    // User
    {
        path: "/dashboard",
        element: Dashboard,
        protected: true,
        anon: false,
    },
    {
        path: "/dashboard/edit-account",
        element: EditAccount,
        protected: true,
        anon: false,
    },
    {
        path: "/dashboard/edit-password",
        element: EditPassword,
        protected: true,
        anon: false,
    },
]

export default routes
