// models/Education.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const EducationSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
    description: { type: String },
    Institute:{type:String},
    Category: [{ type: String }], 
    tags: [{ type: String }], 
    sourceLink: { type: String },
    status: { type: String, enum: ['draft', 'publish'], default: 'draft' },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite upon hot-reloading in development
const Education = models.Education || model('Education', EducationSchema, 'education');

export { Education };
