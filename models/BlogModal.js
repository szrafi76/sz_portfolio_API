const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        short_description: { type: String, required: true },
        thumbnail: { type: String, required: true },
        author: { type: String, required: true },
        post_date: { type: String, required: true },
        preview_link: { type: String, required: true },
    },
    {
        collection: "blog_collection",
        timestamps: true,
        versionKey: false
    }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
