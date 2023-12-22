const express = require("express");
const { createSkill, getSkillList, getSkillDetails, updateSkill, deleteSkill } = require("../controllers/SkillZoneController");
const { authenticateToken } = require("../config/generateToken");
const SkillZoneRoute = express.Router();

SkillZoneRoute.route('/create-skill').post(authenticateToken, createSkill)
SkillZoneRoute.route('/update-skill').put(authenticateToken, updateSkill);
SkillZoneRoute.route('/skill-list').get(getSkillList);
SkillZoneRoute.route('/skill-details/:id').get(getSkillDetails);
SkillZoneRoute.route('/delete-skill/:id').delete(authenticateToken, deleteSkill);

module.exports = SkillZoneRoute;