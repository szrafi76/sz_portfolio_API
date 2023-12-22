const asyncHandler = require("express-async-handler");
const Project = require("../models/ProjectModal");

/**
 * Store New Project Information
 */

const createProject = asyncHandler(async (req, res) => {
    const { project_title, project_details, organization, project_logo, project_banner, technologies, project_screen, source_link, preview_link, status } = req.body;

    if (!project_title || !project_details || !organization || !project_banner || technologies.length === 0 || project_screen.length === 0) {
        res.status(400).json({
            error: "Please provide all required fields",
        });
        return;
    }

    const createProject = await Project.create({
        project_title,
        project_details,
        organization,
        project_logo,
        project_banner,
        source_link,
        preview_link,
        status,
        technologies,
        project_screen,
    });

    if (createProject) {
        res.status(201).json({
            data: {
                _id: createProject._id,
                project_title: createProject.project_title,
                project_details: createProject.project_details,
                organization: createProject.organization,
                project_logo: createProject.project_logo,
                project_banner: createProject.project_banner,
                source_link: createProject.source_link,
                preview_link: createProject.preview_link,
                status: createProject.status,
                technologies: createProject.technologies,
                project_screen: createProject.project_screen,
            },
            status: 201,
            message: "Project added successfully!"

        });
    } else {
        res.status(400);
        throw new Error("Failed to add new Project!");
    }
});


/**
 * Get Project Information List
 */
const getProjectList = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    let countPromise, itemsPromise;

    if (status && status.trim() !== '') {
        countPromise = Project.countDocuments({ status });
        itemsPromise = Project.find({ status }).limit(limit).skip(page > 1 ? skip : 0);
    } else {
        countPromise = Project.countDocuments({});
        itemsPromise = Project.find().limit(limit).skip(page > 1 ? skip : 0);
    }

    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = Math.ceil(count / limit);
    const viewCurrentPage = count > limit ? pageCount : page;

    if (!items) {
        res.status(400);
        throw new Error("Failed to fetch Project list.");
    }

    res.status(201).json({
        pagination: {
            total_data: count,
            total_page: pageCount,
            current_page: page,
            data_load_current_page: items.length,
        },
        data: items,
        status: 201,
        message: "Project list fetched successfully!",
    });
});



/**
 * Get Single Project
 */
const getProjectDetails = asyncHandler(async (req, res) => {
    const ProjectId = req.params.id;

    const singleProject = await Project.findById(ProjectId);

    if (!singleProject) {
        res.status(400);
        throw new Error("Failed to fetch Project");
    }

    res.status(201).json({
        data: singleProject,
        status: 201,
        message: "Project fetched successfully!",
    });
});


/**
 * Update Project Info
 */
const updateProject = asyncHandler(async (req, res) => {

    const { _id, project_title, project_details, organization, project_logo, project_banner, technologies, project_screen, source_link, preview_link, status } = req.body;

    if (!project_title || !project_details || !organization || !project_banner || technologies.length === 0 || project_screen.length === 0) {
        res.status(400).json({
            error: "Please provide all required fields",
        });
        return;
    }



    const updateOne = await Project.updateOne({ _id }, {
        $set: {
            _id: _id,
            project_title: project_title,
            project_details: project_details,
            organization: organization,
            project_logo: project_logo,
            project_banner: project_banner,
            source_link: source_link,
            preview_link: preview_link,
            status: status,
            technologies: technologies,
            project_screen: project_screen,
        }
    });

    if (updateOne) {
        res.status(201).json({
            status: 201,
            message: "Project updated successfully!",
            data: {
                _id: _id,
                project_title: project_title,
                project_details: project_details,
                organization: organization,
                project_logo: project_logo,
                project_banner: project_banner,
                source_link: source_link,
                preview_link: preview_link,
                status: status,
                technologies: technologies,
                project_screen: project_screen,
               
            },
        });
    } else {
        res.status(400);
        throw new Error("Failed to update Project");
    }
});


/**
 * Delete Single Project
 */
const deleteProject = asyncHandler(async (req, res) => {

    const removeProject = await Project.findByIdAndDelete(req.params.id);

    if (removeProject) {
        res.status(201).json({
            status: 201,
            message: "Project deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete Project");
    }
});

module.exports = { createProject, getProjectList, getProjectDetails, updateProject, deleteProject }