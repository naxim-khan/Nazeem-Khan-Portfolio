// models/Shop.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }], 
    afilink: { type: String },
    price: { type: String }, // you can use Number
    status: { type: String, enum: ['draft', 'publish'], default: 'draft' },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite upon hot-reloading in development
const Product = models.Product || model('Product', ProductSchema, 'products');

export { Product };
