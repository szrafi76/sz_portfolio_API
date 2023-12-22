const mongoose = require("mongoose");

const SkillsSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        expertise_level: { type: String, required: true },
        icon: {
            type: String,
            default: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
        },
    },
    {
        collection: "skills_collection",
        timestamps: true,
        versionKey: false
    }
);

const Skill = mongoose.model("Skill", SkillsSchema);

module.exports = Skill;
