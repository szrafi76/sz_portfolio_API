const mongoose = require("mongoose");

const EducationSchema = mongoose.Schema(
    {
        degree: { type: String, required: true },
        department: { type: String, required: false },
        institute: { type: String, required: true },
        starting_date: { type: String, required: true },
        ending_date: { type: String, required: false },
        result: { type: String, required: true },
        is_running: { type: Boolean, required: false },
    },
    {
        collection: "education_collection",
        timestamps: true,
        versionKey: false
    }
);

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;
