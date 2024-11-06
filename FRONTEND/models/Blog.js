// models/Blog.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
    description: { type: String },
    blogcategory: [{ type: String }], 
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'publish'], default: 'draft' },
    comments:[{type:Schema.Types.ObjectId, ref:'Comment'}]
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite upon hot-reloading in development
const Blog = models.Blog || model('Blog', BlogSchema, 'blogs');

export { Blog };
