const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
})

const SkillZoneSchema = mongoose.Schema(
    {
        skill_title: { type: String, required: true },
        skill_list: { type: [SkillSchema], required: true }
    },
    {
        collection: "expertise_collection",
        timestamps: true,
        versionKey: false
    }
);

const SkillZone = mongoose.model("SkillZone", SkillZoneSchema);

module.exports = SkillZone;
