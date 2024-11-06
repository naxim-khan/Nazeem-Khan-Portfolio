// models/Photo.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const PhotoSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite upon hot-reloading in development
const Photos = models.Photo || model('Photo', PhotoSchema, 'photos');

export { Photos };
