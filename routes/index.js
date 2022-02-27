const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// Auth
const auth = require("./auth")
router.use("/auth", auth)

// Users
const users = require("./users")
router.use("/users", users)

// Application
const apps = require("./apps")
router.use("/apps", apps)

module.exports = router
