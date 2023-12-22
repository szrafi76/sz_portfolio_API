const asyncHandler = require("express-async-handler");
const Experience = require("../models/ExperienceModal");

/**
 * Store New Experience Information
 */

const createExperience = asyncHandler(async (req, res) => {
    const { designation, company_name, location, joining_date, resignation_date, is_running, responsibilities } = req.body;

    if (!designation || !company_name || !location || !joining_date) {
        res.status(400).json({
            error: "Please provide all required fields",
        });
        return;
    }

    const createExperience = await Experience.create({
        designation,
        company_name,
        location,
        joining_date,
        resignation_date,
        is_running,
        responsibilities
    });

    if (createExperience) {
        res.status(201).json({
            data: {
                _id: createExperience._id,
                designation: createExperience.designation,
                company_name: createExperience.company_name,
                location: createExperience.location,
                joining_date: createExperience.joining_date,
                resignation_date: createExperience.resignation_date,
                is_running: createExperience.is_running,
                responsibilities: createExperience.responsibilities
            },
            status: 201,
            message: "Experience added successfully!"

        });
    } else {
        res.status(400);
        throw new Error("Failed to add new experience!");
    }
});


/**
 * Get Experience Information List
 */
const getExperienceList = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const countPromise = Experience.countDocuments({});
    const itemsPromise = Experience.find().limit(limit).skip(page > 1 ? skip : 0);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = count / limit;
    const viewCurrentPage = count > limit ? Math.ceil(pageCount) : page;

    if (!items) {
        res.status(400);
        throw new Error("Failed to fetch Experience list.");
    }

    res.status(201).json({
        pagination: {
            total_data: count,
            total_page: viewCurrentPage,
            current_page: page,
            data_load_current_page: items.length,
        },
        data: items,
        status: 201,
        message: "Experience list fetched successfully!",
    });
});


/**
 * Get Single Experience
 */
const getExperienceDetails = asyncHandler(async (req, res) => {
    const ExperienceId = req.params.id;

    const singleExperience = await Experience.findById(ExperienceId);

    if (!singleExperience) {
        res.status(400);
        throw new Error("Failed to fetch Experience");
    }

    res.status(201).json({
        data: singleExperience,
        status: 201,
        message: "Experience fetched successfully!",
    });
});


/**
 * Update Experience Info
 */
const updateExperience = asyncHandler(async (req, res) => {

    const { _id, designation, company_name, location, joining_date, resignation_date, is_running, responsibilities } = req.body;

    if (!designation || !company_name || !location || !joining_date) {
        res.status(400).json({
            error: "Please provide all required fields",
        });
        return;
    }



    const updateOne = await Experience.updateOne({ _id }, {
        $set: {
            _id: _id,
            designation: designation,
            company_name: company_name,
            location: location,
            joining_date: joining_date,
            resignation_date: resignation_date,
            is_running: is_running,
            responsibilities: responsibilities
        }
    });

    if (updateOne) {
        res.status(201).json({
            status: 201,
            message: "Experience updated successfully!",
            data: {
                _id: _id,
                designation: designation,
                company_name: company_name,
                location: location,
                joining_date: joining_date,
                resignation_date: resignation_date,
                is_running: is_running,
                responsibilities: responsibilities
            },
        });
    } else {
        res.status(400);
        throw new Error("Failed to update experience");
    }
});


/**
 * Delete Single Experience
 */
const deleteExperience = asyncHandler(async (req, res) => {

    const removeExperience = await Experience.findByIdAndDelete(req.params.id);

    if (removeExperience) {
        res.status(201).json({
            status: 201,
            message: "Experience deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete Experience");
    }
});

module.exports = { createExperience, getExperienceList, getExperienceDetails, updateExperience, deleteExperience }