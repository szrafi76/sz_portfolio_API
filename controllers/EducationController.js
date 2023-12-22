const asyncHandler = require("express-async-handler");
const Education = require("../models/EducationModal");

/**
 * Store New Education Information
 */

const createEducation = asyncHandler(async (req, res) => {
    const { degree, department, institute, starting_date, ending_date, result, is_running } = req.body;

    if (!degree || !institute || !starting_date || !result) {
        res.status(400);
        throw new Error("Please input all required fields");
    }

    const createEducation = await Education.create({
        degree,
        department,
        institute,
        starting_date,
        ending_date,
        result,
        is_running,
    });

    if (createEducation) {
        res.status(201).json({
            data: {
                _id: createEducation._id,
                degree: createEducation.degree,
                department: createEducation.department,
                institute: createEducation.institute,
                starting_date: createEducation.starting_date,
                ending_date: createEducation.ending_date,
                result: createEducation.result,
                is_running: createEducation.is_running,
            },
            status: 201,
            message: "You have successfully create education!"

        });
    } else {
        res.status(400);
        throw new Error("Failed to create new education!");
    }
});


/**
 * Get Education Information List
 */
const getEducationList = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const countPromise = Education.countDocuments({});
    const itemsPromise = Education.find().limit(limit).skip(page > 1 ? skip : 0);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = count / limit;
    const viewCurrentPage = count > limit ? Math.ceil(pageCount) : page;

    if (!items) {
        res.status(400);
        throw new Error("Failed to load Education list.");
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
        message: "Education list loaded successfully!",
    });
});


/**
 * Get Single Education
 */
const getEducationDetails = asyncHandler(async (req, res) => {
    const EducationId = req.params.id;

    const singleEducation = await Education.findById(EducationId);

    if (!singleEducation) {
        res.status(400);
        throw new Error("Failed to load Education");
    }

    res.status(201).json({
        data: singleEducation,
        status: 201,
        message: "Education loaded successfully!",
    });
});


/**
 * Update Education Info
 */
const updateEducation = asyncHandler(async (req, res) => {

    const {_id, degree, department, institute, starting_date, ending_date, result, is_running } = req.body;

    if (!degree || !institute || !starting_date || !result) {
        res.status(400);
        throw new Error("Please input all required fields");
    }

    const updateOne = await Education.updateOne({ _id }, {
        $set: {
            _id: _id,
            degree: degree,
            department: department,
            institute: institute,
            starting_date: starting_date,
            ending_date: ending_date,
            result: result,
            is_running: is_running,
        }
    });

    if (updateOne) {
        res.status(201).json({
            status: 201,
            message: "Education updated successfully!",
            data: {
                _id: _id,
                degree: degree,
                department: department,
                institute: institute,
                starting_date: starting_date,
                ending_date: ending_date,
                result: result,
                is_running: is_running,
            },
        });
    } else {
        res.status(400);
        throw new Error("Failed to Education");
    }
});


/**
 * Delete Single Education
 */
const deleteEducation = asyncHandler(async (req, res) => {

    const removeEducation = await Education.findByIdAndDelete(req.params.id);

    if (removeEducation) {
        res.status(201).json({
            status: 201,
            message: "Education deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete Education");
    }
});

module.exports = { createEducation, getEducationList, getEducationDetails, updateEducation, deleteEducation }