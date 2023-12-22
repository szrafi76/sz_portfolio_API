const express = require("express");
const { createProject, getProjectList, getProjectDetails, updateProject, deleteProject } = require("../controllers/ProjectController");
const { authenticateToken } = require("../config/generateToken");
const ProjectRoute = express.Router();

ProjectRoute.route('/create-project').post(authenticateToken, createProject)
ProjectRoute.route('/update-project').put(authenticateToken, updateProject);
ProjectRoute.route('/project-list').get(getProjectList);
ProjectRoute.route('/project-details/:id').get(getProjectDetails);
ProjectRoute.route('/delete-project/:id').delete(authenticateToken, deleteProject);

module.exports = ProjectRoute;