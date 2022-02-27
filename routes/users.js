// Packages
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Models
const User = require("../models/User.model")

// Utils
const { regex } = require("../utils/regex")
const jwtConfig = require("../utils/jwt-config")

// Salt
const saltRounds = 10

// Get all users
router.get("/all-users", (req, res, next) => {
    User.find()
        .then(userFromDb => {
            res.status(200).json(userFromDb)
        })
        .catch(err => next(err))
})

// Get user by ID
router.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(err => next(err))
})

// Edit account
router.put("/edit/:id", (req, res, next) => {
    const { firstName, lastName, email, _id } = req.body

    if (!firstName) {
        return res
            .status(400)
            .json({ message: "Your first name can not be empty." })
    }

    if (!lastName) {
        return res
            .status(400)
            .json({ message: "Your last name can not be empty." })
    }

    User.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, email, _id },
        { new: true }
    )
        .then(updatedUser => {
            const payload = { firstName, lastName, email, _id }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                jwtConfig
            )

            res.status(200).json({ user: updatedUser, token: authToken })
        })
        .catch(err => next(err))
})

// Edit password
router.put("/edit-password/:id", (req, res, next) => {
    const { firstName, lastName, email, _id, password } = req.body

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    return bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            return User.findByIdAndUpdate(req.params.id, {
                password: hashedPassword,
                firstName,
                lastName,
                email,
                _id,
            })
                .then(updatedUser => {
                    const payload = { firstName, lastName, email, _id }

                    const authToken = jwt.sign(
                        payload,
                        process.env.TOKEN_SECRET,
                        jwtConfig
                    )

                    res.status(200).json({
                        user: updatedUser,
                        token: authToken,
                    })
                })
                .catch(err => next(err))
        })
})

// Delete account
router.delete("/delete-user/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "User deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
