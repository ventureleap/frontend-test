const { Schema, model } = require("mongoose")

const applicationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        version: {
            type: Number,
            required: true,
        },

        lang: {
            type: String,
            required: true,
        },

        secret: String,

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
)

const Application = model("Application", applicationSchema)

module.exports = Application
