// Packages
const mongoose = require("mongoose")
require("dotenv/config")

// Model
const Application = require("../models/Application.model")

// Get data
const appNames = require("./seeds/app-names.json")
const userIds = require("./seeds/users-ids.json")
const allLangs = require("./seeds/langs.json")

// Utils
const getRandom = require("../utils/getRandom")
const getRandomNumber = require("../utils/getRandomNumber")

// Open connection to mongoose
mongoose.connect(process.env.MONGODB_URI)

// Create apps
let fakeApps = []

for (let i = 0; i < appNames.length; i++) {
    fakeApps.push({
        name: appNames[i],
        version: getRandomNumber(1, 8),
        lang: getRandom(allLangs),
        secret: "supersecretphrase",
        user: getRandom(userIds),
    })
}

// Push fake apps to db
Application.insertMany(fakeApps)
    .then(apps => {
        console.log(`Success, you inserted ${apps.length} apps!`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
