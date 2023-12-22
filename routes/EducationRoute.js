const express = require("express");
const { createEducation, getEducationList, getEducationDetails, updateEducation, deleteEducation, getEducationDropdownList } = require("../controllers/EducationController");
const { authenticateToken } = require("../config/generateToken");
const EducationRoute = express.Router();

EducationRoute.route('/create-education').post(authenticateToken, createEducation)
EducationRoute.route('/update-education').put(authenticateToken, updateEducation);
EducationRoute.route('/education-list').get(getEducationList);
EducationRoute.route('/education-details/:id').get(getEducationDetails);
EducationRoute.route('/delete-education/:id').delete(authenticateToken, deleteEducation);

module.exports = EducationRoute;