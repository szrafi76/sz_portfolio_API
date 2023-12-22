const mongoose = require("mongoose");
const moment = require("moment");

const TechnologiesSchema = mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
});

const ProjectScreenSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }
});

const ProjectSchema = mongoose.Schema(
    {
        project_title: { type: String, required: true },
        project_details: { type: String, required: true },
        organization: { type: String, required: true },
        project_logo: { type: String, required: false },
        project_banner: { type: String, required: true },
        technologies: { type: [TechnologiesSchema], required: true },
        project_screen: { type: [ProjectScreenSchema], required: true },
        source_link: { type: String, required: false },
        preview_link: { type: String, required: false },
        status: { type: String, required: false, default: "active" },
        crated_at: {
            type: Date,
            allowNull: false,
            defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
            field: 'createdAt'
        },
    },
    {
        collection: "project_collection",
        timestamps: true,
        versionKey: false
    }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
