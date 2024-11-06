// pages/api/projects.js
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Shop"; // Corrected import

export default async function handle(req, res) {
    const { method } = req;

    // Wrap the entire handler in a try-catch to catch unexpected errors
    try {
        // Connect to the database
        await mongooseConnect();
    } catch (connError) {
        console.error('Database connection error:', connError);
        return res.status(500).json({ success: false, error: 'Database connection failed' });
    }

    if (method === 'POST') {
        const { title, slug, images, description, tags, afilink, price, status, } = req.body;

        try {
            const projectDoc = await Product.create(
                {title, slug, images, description, tags, afilink, price, status,});

            return res.status(201).json(projectDoc);
        } catch (error) {
            console.error('Error creating product:', error);

            // Validation Error
            if (error.name === 'ValidationError') {
                return res.status(400).json({ success: false, error: error.message });
            }

            // Duplicate Key Error (e.g., unique slug)
            if (error.code === 11000) {
                return res.status(400).json({ success: false, error: 'Duplicate field value entered.' });
            }

            // General Server Error
            return res.status(500).json({ success: false, error: 'Failed to create product' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const project = await Product.findById(req.query.id);
                if (!project) {
                    return res.status(404).json({ success: false, error: 'Product not found' });
                }
                return res.status(200).json(project);
            } else {
                const projects = await Product.find().sort({ createdAt: -1 });
                return res.status(200).json(projects);
            }
        } catch (error) {
            console.error('Error fetching Products:', error);
            return res.status(500).json({ success: false, error: 'Failed to fetch products' });
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, description, tags, afilink, price, status, } = req.body;

        try {
            const project = await Product.findByIdAndUpdate(_id, 
                {title, slug, images, description, tags, afilink, price, status,}, { new: true, runValidators: true });

            if (!project) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            return res.status(200).json(project);
        } catch (error) {
            console.error('Error updating project:', error);

            // Validation Error
            if (error.name === 'ValidationError') {
                return res.status(400).json({ success: false, error: error.message });
            }

            // Duplicate Key Error (e.g., unique slug)
            if (error.code === 11000) {
                return res.status(400).json({ success: false, error: 'Duplicate field value entered.' });
            }

            // General Server Error
            return res.status(500).json({ success: false, error: 'Failed to update product' });
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                const deleted = await Product.findByIdAndDelete(req.query.id);
                if (!deleted) {
                    return res.status(404).json({ success: false, error: 'Prduct not found' });
                }
                return res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting product:', error);
                return res.status(500).json({ success: false, error: 'Failed to delete product' });
            }
        } else {
            return res.status(400).json({ success: false, error: 'No Product ID provided' });
        }
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
}
