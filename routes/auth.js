// Packages
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Models
const User = require("../models/User.model")

// Utils
const { regex, emailRegex } = require("../utils/regex")
const jwtConfig = require("../utils/jwt-config")

// Middleware
const { isAuthenticated } = require("../middleware/jwt.middleware")

// Salt
const saltRounds = 10

// Signup
router.post("/signup", (req, res, next) => {
    const { email, firstName, lastName, password } = req.body

    if (!firstName) {
        return res
            .status(400)
            .json({ message: "Please provide your first name." })
    }

    if (!lastName) {
        return res
            .status(400)
            .json({ message: "Please provide your last name." })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address.",
        })
    }

    if (!password) {
        return res
            .status(400)
            .json({ message: "Please provide your password." })
    }

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    User.findOne({ email })
        .then(found => {
            if (found) {
                return res.status(400).json({ message: "Email already taken." })
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashed = bcrypt.hashSync(password, salt)

            return User.create({
                firstName,
                lastName,
                email,
                password: hashed,
            }).then(createdUser => {
                const { firstName, lastName, email, _id } = createdUser
                const user = { firstName, lastName, email, _id }
                const payload = { firstName, lastName, email, _id }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    jwtConfig
                )

                res.status(201).json({ user: user, authToken: authToken })
            })
        })
        .catch(err => next(err))
})

// Login
router.post("/login", (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ message: "Please provide your email." })
    }

    if (!password) {
        return res
            .status(400)
            .json({ message: "Please provide your password." })
    }

    User.findOne({ email })
        .then(found => {
            if (!found) {
                return res.status(401).json({ message: "User not found." })
            }

            const passwordCorrect = bcrypt.compareSync(password, found.password)

            if (passwordCorrect) {
                const { _id, email, firstName, lastName } = found

                const payload = { _id, email, firstName, lastName }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    jwtConfig
                )

                res.status(200).json({ authToken: authToken })
            } else {
                res.status(401).json({
                    message: "Unable to authenticate the user.",
                })
            }
        })
        .catch(err => next(err))
})

// Verify is user is authenticated
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})

module.exports = router
