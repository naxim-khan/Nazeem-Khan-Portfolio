// pages/api/blog.js
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
    // Connect to the database
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images, description, blogcategory, tags, status } = req.body;

        try {
            const blogDoc = await Blog.create({
                title,
                slug,
                images,
                description,
                blogcategory,
                tags,
                status
            });

            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(400).json({ success: false, error: 'Failed to create blog' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const blog = await Blog.findById(req.query.id);
                if (!blog) {
                    return res.status(404).json({ success: false, error: 'Blog not found' });
                }
                res.status(200).json(blog);
            } else {
                const blogs = await Blog.find().sort({ createdAt: -1 });
                res.status(200).json(blogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch blogs' });
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, description, blogcategory, tags, status } = req.body;

        try {
            const blog = await Blog.findByIdAndUpdate(_id, {
                title,
                slug,
                images,
                description,
                blogcategory,
                tags,
                status
            }, { new: true, runValidators: true });

            if (!blog) {
                return res.status(404).json({ success: false, error: 'Blog not found' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error('Error updating blog:', error);
            res.status(400).json({ success: false, error: 'Failed to update blog' });
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                const deleted = await Blog.findByIdAndDelete(req.query.id);
                if (!deleted) {
                    return res.status(404).json({ success: false, error: 'Blog not found' });
                }
                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting blog:', error);
                res.status(500).json({ success: false, error: 'Failed to delete blog' });
            }
        } else {
            res.status(400).json({ success: false, error: 'No blog ID provided' });
        }
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
