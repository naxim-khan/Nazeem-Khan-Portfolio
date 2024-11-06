// models/Project.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
    description: { type: String },
    client:{type:String},
    projectcategory: [{ type: String }], 
    tags: [{ type: String }], 
    livepreview: { type: String },
    status: { type: String, enum: ['draft', 'publish'], default: 'draft' },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite upon hot-reloading in development
const Project = models.Project || model('Project', ProjectSchema, 'projects');

export { Project };
