const express = require("express");
const { createBlog, getBlogList, getBlogDetails, updateBlog, deleteBlog, getBlogDropdownList } = require("../controllers/BlogController");
const { authenticateToken } = require("../config/generateToken");
const BlogRoute = express.Router();

BlogRoute.route('/create-blog').post(authenticateToken, createBlog)
BlogRoute.route('/update-blog').put(authenticateToken, updateBlog);
BlogRoute.route('/blog-list').get(getBlogList);
BlogRoute.route('/blog-details/:id').get(getBlogDetails);
BlogRoute.route('/delete-blog/:id').delete(authenticateToken, deleteBlog);

module.exports = BlogRoute;