import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
    // if authenticated, connect to mongodb
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            // fetch a single project by id
            const blog = await Blog.findById(req.query.id);
            res.json(blog);
        } else if (req.query?.tags) {
            // fetch blogs by tags
            const blogcate = await Blog.find({ tags: req.query.tags })
            res.json(blogcate);
        }
        else if (req.query.blogcategory) {
            // fetch blogs by category
            const blogcate = await Blog.find({ blogcategory: req.query.blogcategory })
            res.json(blogcate);
        }else if (req.query?.slug) {
            // fetch blogs by slug
            const blogcate = await Blog.find({ slug: req.query.slug })
            res.json(blogcate.reverse());
        }
         else {
            // fetch all projects
            const Blogs = await Blog.find();
            res.json(Blogs.reverse())
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}