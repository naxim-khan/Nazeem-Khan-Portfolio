// pages/api/photos.js
import { mongooseConnect } from "@/lib/mongoose";
import { Photos } from "@/models/Photo";

export default async function handle(req, res) {
    // Connect to the database
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images} = req.body;

        try {
            const blogDoc = await Photos.create({
                title,
                slug,
                images,
            });

            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error Updating Images:', error);
            res.status(400).json({ success: false, error: 'Failed to creating Photos' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const blog = await Photos.findById(req.query.id);
                if (!blog) {
                    return res.status(404).json({ success: false, error: 'Image not found' });
                }
                res.status(200).json(blog);
            } else {
                const blogs = await Photos.find().sort({ createdAt: -1 });
                res.status(200).json(blogs);
            }
        } catch (error) {
            console.error('Error fetching Photos:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch Photoss' });
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images,} = req.body;

        try {
            const blog = await Photos.findByIdAndUpdate(_id, {
                title,
                slug,
                images
            }, { new: true, runValidators: true });

            if (!blog) {
                return res.status(404).json({ success: false, error: 'Photos not found' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error('Error updating Photos:', error);
            res.status(400).json({ success: false, error: 'Failed to update Photos' });
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                const deleted = await Photos.findByIdAndDelete(req.query.id);
                if (!deleted) {
                    return res.status(404).json({ success: false, error: 'Image not found' });
                }
                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting Image:', error);
                res.status(500).json({ success: false, error: 'Failed to delete Image' });
            }
        } else {
            res.status(400).json({ success: false, error: 'No Image ID provided' });
        }
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
