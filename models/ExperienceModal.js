const mongoose = require("mongoose");

const ResponsibilitySchema = mongoose.Schema({
    value: { type: String, required: true },
    title: { type: String, required: true }
});

const ExperienceSchema = mongoose.Schema(
    {
        designation: { type: String, required: true },
        company_name: { type: String, required: true },
        location: { type: String, required: true },
        joining_date: { type: String, required: true },
        resignation_date: { type: String, required: false },
        is_running: { type: Boolean, required: false },
        responsibilities: { type: [ResponsibilitySchema], required: true },
    },
    {
        collection: "experience_collection",
        timestamps: true,
        versionKey: false
    }
);

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
