const asyncHandler = require("express-async-handler");
const SkillZone = require("../models/SkillZoneModal");

/**
 * Store New Skill Information
 */
const createSkill = asyncHandler(async (req, res) => {
    const { skill_title, skill_list } = req.body;

    if (!skill_title || skill_list.length === 0) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const createdSkill = await SkillZone.create({
        skill_title,
        skill_list,
    });

    if (createdSkill) {
        res.status(201).json({
            data: {
                _id: createdSkill._id,
                skill_title: createdSkill.skill_title,
                skill_list: createdSkill.skill_list,
            },
            status: 201,
            message: "Skill created successfully!",
        });
    } else {
        res.status(400);
        throw new Error("Failed to create a new Skill");
    }
});

/**
 * Get Skill Information List
 */
const getSkillList = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const countPromise = SkillZone.countDocuments({});
    const itemsPromise = SkillZone.find().limit(limit).skip(page > 1 ? skip : 0);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = Math.ceil(count / limit);
    const viewCurrentPage = Math.min(page, pageCount);

    if (!items) {
        res.status(400);
        throw new Error("Failed to load the Skill list");
    }

    res.status(200).json({
        pagination: {
            total_data: count,
            total_page: pageCount,
            current_page: viewCurrentPage,
            data_load_current_page: items.length,
        },
        data: items,
        status: 200,
        message: "Skill list loaded successfully!",
    });
});

/**
 * Get Single Skill
 */
const getSkillDetails = asyncHandler(async (req, res) => {
    const skillId = req.params.id;

    const singleSkill = await SkillZone.findById(skillId);

    if (!singleSkill) {
        res.status(404);
        throw new Error("Skill not found");
    }

    res.status(200).json({
        data: singleSkill,
        status: 200,
        message: "Skill loaded successfully!",
    });
});

/**
 * Update Skill Info
 */
const updateSkill = asyncHandler(async (req, res) => {
    const { _id, skill_title, skill_list } = req.body;

    if (!skill_title || skill_list.length === 0) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const updatedSkill = await SkillZone.findByIdAndUpdate(
        _id,
        {
            skill_title,
            skill_list,
        },
        { new: true }
    );

    if (updatedSkill) {
        res.status(200).json({
            data: updatedSkill,
            status: 200,
            message: "Skill updated successfully!",
        });
    } else {
        res.status(404);
        throw new Error("Skill not found");
    }
});

/**
 * Delete Single Skill
 */
const deleteSkill = asyncHandler(async (req, res) => {
    const deletedSkill = await SkillZone.findByIdAndDelete(req.params.id);

    if (deletedSkill) {
        res.status(200).json({
            status: 200,
            message: "Skill deleted successfully!",
        });
    } else {
        res.status(404);
        throw new Error("Skill not found");
    }
});

module.exports = { createSkill, getSkillList, getSkillDetails, updateSkill, deleteSkill };
