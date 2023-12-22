const asyncHandler = require("express-async-handler");
const Blog = require("../models/BlogModal");

/**
 * Store New Blog Information
 */

const createBlog = asyncHandler(async (req, res) => {
    const { title, short_description, thumbnail, post_date, preview_link } = req.body;

    if (!title || !short_description || !thumbnail || !post_date || !preview_link) {
        res.status(400);
        throw new Error("Please input all required fields");
    }

    const createBlog = await Blog.create({
        title,
        short_description,
        thumbnail,
        author: "Fayez",
        post_date,
        preview_link,
    });

    if (createBlog) {
        res.status(201).json({
            data: {
                _id: createBlog._id,
                title: createBlog.title,
                short_description: createBlog.short_description,
                thumbnail: createBlog.thumbnail,
                author: createBlog.author,
                post_date: createBlog.post_date,
                preview_link: createBlog.preview_link
            },
            status: 201,
            message: "You have successfully create Blog!"

        });
    } else {
        res.status(400);
        throw new Error("Failed to create new Blog!");
    }
});


/**
 * Get Blog Information List
 */
const getBlogList = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const countPromise = Blog.countDocuments({});
    const itemsPromise = Blog.find().limit(limit).skip(page > 1 ? skip : 0);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = count / limit;
    const viewCurrentPage = count > limit ? Math.ceil(pageCount) : page;

    if (!items) {
        res.status(400);
        throw new Error("Failed to load Blog list.");
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
        message: "Blog list loaded successfully!",
    });
});


/**
 * Get Single Blog
 */
const getBlogDetails = asyncHandler(async (req, res) => {
    const BlogId = req.params.id;

    const singleBlog = await Blog.findById(BlogId);

    if (!singleBlog) {
        res.status(400);
        throw new Error("Failed to load Blog");
    }

    res.status(201).json({
        data: singleBlog,
        status: 201,
        message: "Blog loaded successfully!",
    });
});


/**
 * Update Blog Info
 */
const updateBlog = asyncHandler(async (req, res) => {

    const { _id, title, short_description, thumbnail, post_date, preview_link } = req.body;

    if (!title || !short_description || !thumbnail || !post_date || !preview_link) {
        res.status(400);
        throw new Error("Please input all required fields");
    }


    const updateOne = await Blog.updateOne({ _id }, {
        $set: {
            _id: _id,
            title: title,
            short_description: short_description,
            thumbnail: thumbnail,
            post_date: post_date,
            preview_link: preview_link
        }
    });

    if (updateOne) {
        res.status(201).json({
            status: 201,
            message: "Blog updated successfully!",
            data: {
                _id: _id,
                title: title,
                short_description: short_description,
                thumbnail: thumbnail,
                author: "Fayez",
                post_date: post_date,
                preview_link: preview_link
            },
        });
    } else {
        res.status(400);
        throw new Error("Failed to Blog");
    }
});


/**
 * Delete Single Blog
 */
const deleteBlog = asyncHandler(async (req, res) => {

    const removeBlog = await Blog.findByIdAndDelete(req.params.id);

    if (removeBlog) {
        res.status(201).json({
            status: 201,
            message: "Blog deleted successfully!"
        });
    } else {
        res.status(400);
        throw new Error("Failed to delete Blog");
    }
});

module.exports = { createBlog, getBlogList, getBlogDetails, updateBlog, deleteBlog }