// Packages
const mongoose = require("mongoose")
require("dotenv/config")
const bcrypt = require("bcryptjs")

// Model
const User = require("../models/User.model")

// Get fake users
const allUsers = require("./seeds/users.json")

// Utils
const convertToEmail = require("../utils/convertToEmail")
const getRandom = require("../utils/getRandom")

// Hash password
const salt = bcrypt.genSaltSync()
const password = "Password42"
const hash = bcrypt.hashSync(password, salt)

// Open connection to mongoose
mongoose.connect(process.env.MONGODB_URI)

// Create users
const realUser = {
    firstName: "Julien",
    lastName: "Sebag",
    email: "a@b.com",
    password: hash,
}

let fakeUsers = []

for (let i = 0; i < allUsers.length; i++) {
    fakeUsers.push({
        firstName: allUsers[i].firstName,
        lastName: allUsers[i].lastName,
        email: convertToEmail(
            `${allUsers[i].firstName} ${allUsers[i].lastName}`
        ),
        password: hash,
    })
}

// Push users to the database
User.insertMany(fakeUsers)
    .then(users => {
        console.log(`Success, you inserted ${users.length} users!`)
    })
    .catch(err => console.log(err))

User.insertMany(realUser)
    .then(users => {
        console.log(
            `Success, you inserted ${users.length} real user${
                users.length > 1 ? "s" : ""
            }!`
        )
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
