const express = require("express");
const { createSkill, getSkillList, getSkillDetails, updateSkill, deleteSkill, getSkillDropdownList } = require("../controllers/SkillController");
const { authenticateToken } = require("../config/generateToken");
const SkillRoute = express.Router();

SkillRoute.route('/create-skill').post(authenticateToken, createSkill)
SkillRoute.route('/update-skill').put(authenticateToken, updateSkill);
SkillRoute.route('/skill-list').get(getSkillList);
SkillRoute.route('/skill-dropdown-list').get(getSkillDropdownList);
SkillRoute.route('/skill-details/:id').get(getSkillDetails);
SkillRoute.route('/delete-skill/:id').delete(authenticateToken, deleteSkill);

module.exports = SkillRoute;