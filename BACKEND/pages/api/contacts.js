// pages/api/contact.js
import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
    // Connect to the database
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        const { name, lname, email, company, phone, country, description, project} = req.body;

        try {
            const blogDoc = await Contact.create(
                { name, lname, email, company, phone, country, description, project });

            res.status(201).json(blogDoc);
        } catch (error) {
            console.error('Error creating contact:', error);
            res.status(400).json({ success: false, error: 'Failed to create contact' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const blog = await Contact.findById(req.query.id);
                if (!blog) {
                    return res.status(404).json({ success: false, error: 'Blog not found' });
                }
                res.status(200).json(blog);
            } else {
                const blogs = await Contact.find().sort({ createdAt: -1 });
                res.status(200).json(blogs);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
        }
    }

    if (method === 'PUT') {
        const { _id, name, lname, email, company, phone, country, description, project} = req.body;

        try {
            const blog = await Contact.findByIdAndUpdate(_id, {name, lname, email, company, phone, country, description, project}, { new: true, runValidators: true });

            if (!blog) {
                return res.status(404).json({ success: false, error: 'Contact not found' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error('Error updating contact:', error);
            res.status(400).json({ success: false, error: 'Failed to update contact' });
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                const deleted = await Contact.findByIdAndDelete(req.query.id);
                if (!deleted) {
                    return res.status(404).json({ success: false, error: 'Contact not found' });
                }
                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting contact:', error);
                res.status(500).json({ success: false, error: 'Failed to delete contact' });
            }
        } else {
            res.status(400).json({ success: false, error: 'No contact ID provided' });
        }
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
