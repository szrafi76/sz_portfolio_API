const asyncHandler = require("express-async-handler");
const Skill = require("../models/SkillModal");

/**
 * Store New Skill Information
 */

const createSkill = asyncHandler(async (req, res) => {
    const { title, expertise_level, icon } = req.body;

    if (!title || !expertise_level) {
        res.status(400);
        throw new Error("Please input all required fields");
    }

    const createSkill = await Skill.create({
        title,
        expertise_level,
        icon,
    });

    if (createSkill) {
        res.status(201).json({
            data: {
                _id: createSkill._id,
                name: createSkill.title,
                mobile: createSkill.expertise_level,
                email: createSkill.icon,
            },
            status: 201,
            message: "You have successfully create Skill!"

        });
    } else {
        res.status(400);
        throw new Error("Failed to create new Skill!");
    }
});


/**
 * Get Skill Information List
 */
const getSkillList = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const countPromise = Skill.countDocuments({});
    const itemsPromise = Skill.find().limit(limit).skip(page > 1 ? skip : 0);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = count / limit;
    const viewCurrentPage = count > limit ? Math.ceil(pageCount) : page;

    if (!items) {
        res.status(400);
        throw new Error("Failed to load Skill list.");
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
        message: "Skill list loaded successfully!",
    });
});


/**
 * Get Skill Dropdown List
 */
const getSkillDropdownList = asyncHandler(async (req, res) => {
    try {
        const skillList = await Skill.find({}).exec();
        const skillDropdownList = [];

        for (let i = 0; i < skillList.length; i++) {
            const skill = skillList[i];
            const label = skill.title;
            const value = skill.title.toLowerCase().replace(/\s+/g, '_');
            const expertise_level = skill.expertise_level;

            skillDropdownList.push({ label, value, expertise_level });
        }

        res.status(201).json({
            status: 201,
            message: 'Skill dropdown list fetched successfully!',
            data: skillDropdownList,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error fetching skill dropdown list',
            error: error.message,
        });
    }
});




/**
 * Get Single Skill
 */
const getSkillDetails = asyncHandler(async (req, res) => {
    const SkillId = req.params.id;

    const singleSkill = await Skill.findById(SkillId);

    if (!singleSkill) {
        res.status(400);
        throw new Error("Failed to load Skill");
    }

    res.status(201).json({
        data: singleSkill,
        status: 201,
        message: "Skill loaded successfully!",
    });
});


/**
 * Update Skill Info
 */
const updateSkill = asyncHandler(async (req, res) => {

    const { _id, title, expertise_level, icon } = req.body;

    if (!title || !expertise_level) {
        res.status(400);
        throw new Error("Please input all required fields");
    }
    const updateOne = await Skill.updateOne({ _id }, {
        $set: {
            _id: _id,
            title: title,
            expertise_level: expertise_level,
            icon: icon,
        }
    });

    if (updateOne) {
        res.status(201).json({
            data: {
                _id: _id,
                title: title,
                expertise_level: expertise_level,
                icon: icon,
            },
            status: 201,
            message: "Skill updated successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to Skill");
    }
});


/**
 * Delete Single Skill
 */
const deleteSkill = asyncHandler(async (req, res) => {

    const removeSkill = await Skill.findByIdAndDelete(req.params.id);

    if (removeSkill) {
        res.status(201).json({
            status: 201,
            message: "Skill deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete Skill");
    }
});

module.exports = { createSkill, getSkillList, getSkillDropdownList, getSkillDetails, updateSkill, deleteSkill }