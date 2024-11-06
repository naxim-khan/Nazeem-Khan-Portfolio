// pages/api/projects.js
import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project"; // Corrected import

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
        const { title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;

        try {
            const projectDoc = await Project.create({
                title,
                slug,
                images,
                client,
                description,
                projectcategory,
                tags,
                livepreview,
                status
            });

            return res.status(201).json(projectDoc);
        } catch (error) {
            console.error('Error creating project:', error);

            // Validation Error
            if (error.name === 'ValidationError') {
                return res.status(400).json({ success: false, error: error.message });
            }

            // Duplicate Key Error (e.g., unique slug)
            if (error.code === 11000) {
                return res.status(400).json({ success: false, error: 'Duplicate field value entered.' });
            }

            // General Server Error
            return res.status(500).json({ success: false, error: 'Failed to create project' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const project = await Project.findById(req.query.id);
                if (!project) {
                    return res.status(404).json({ success: false, error: 'Project not found' });
                }
                return res.status(200).json(project);
            } else {
                const projects = await Project.find().sort({ createdAt: -1 });
                return res.status(200).json(projects);
            }
        } catch (error) {
            console.error('Error fetching Projects:', error);
            return res.status(500).json({ success: false, error: 'Failed to fetch projects' });
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;

        try {
            const project = await Project.findByIdAndUpdate(_id, {
                title,
                slug,
                images,
                description,
                client,
                projectcategory,
                tags,
                livepreview,
                status,
            }, { new: true, runValidators: true });

            if (!project) {
                return res.status(404).json({ success: false, error: 'Project not found' });
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
            return res.status(500).json({ success: false, error: 'Failed to update project' });
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                const deleted = await Project.findByIdAndDelete(req.query.id);
                if (!deleted) {
                    return res.status(404).json({ success: false, error: 'Project not found' });
                }
                return res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting project:', error);
                return res.status(500).json({ success: false, error: 'Failed to delete project' });
            }
        } else {
            return res.status(400).json({ success: false, error: 'No Project ID provided' });
        }
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
}
