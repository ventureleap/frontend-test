// Packages
const router = require("express").Router()

// Model
const Application = require("../models/Application.model")

// Get all apps
router.get("/all-apps", (req, res, next) => {
    Application.find()
        .populate("user")
        .then(appFromDb => res.status(200).json(appFromDb))
        .catch(err => next(err))
})

// Get app by ID
router.get("/app/:id", (req, res, next) => {
    Application.findById(req.params.id)
        .populate("user")
        .then(appFromDb => res.status(200).json(appFromDb))
        .catch(err => next(err))
})

// Create a new app
router.post("/new-app", (req, res, next) => {
    const { name, version, lang, secret, user } = req.body

    Application.create({ name, version, lang, secret, user })
        .then(createdApp => res.status(200).json(createdApp))
        .catch(err => next(err))
})

// Edit app
router.put("/edit-app/:id", (req, res, next) => {
    const { name, version, lang, secret } = req.body

    Application.findByIdAndUpdate(
        req.params.id,
        {
            name,
            version,
            lang,
            secret,
        },
        { new: true }
    )
        .then(updatedApp => res.status(200).json(updatedApp))
        .catch(err => next(err))
})

// Delete app
router.delete("/delete-app/:id", (req, res, next) => {
    Application.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Application deleted." }))
        .catch(err => next(err))
})

module.exports = router
