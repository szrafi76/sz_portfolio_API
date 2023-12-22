const express = require("express");
const { createExperience, getExperienceList, getExperienceDetails, updateExperience, deleteExperience, getExperienceDropdownList } = require("../controllers/ExperienceController");
const { authenticateToken } = require("../config/generateToken");
const ExperienceRoute = express.Router();

ExperienceRoute.route('/create-experience').post(authenticateToken, createExperience)
ExperienceRoute.route('/update-experience').put(authenticateToken, updateExperience);
ExperienceRoute.route('/experience-list').get(getExperienceList);
ExperienceRoute.route('/experience-details/:id').get(getExperienceDetails);
ExperienceRoute.route('/delete-experience/:id').delete(authenticateToken, deleteExperience);

module.exports = ExperienceRoute;