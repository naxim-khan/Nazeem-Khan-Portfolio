// models/Comment.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentpera: { type: String },
    maincomment: { type: Boolean },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' }, // Reference to parent comment
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Array of child comments
    parentName: { type: String },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite upon hot-reloading in development
const Comment = models.Comment || model('Comment', CommentSchema, 'comments');

export { Comment };
