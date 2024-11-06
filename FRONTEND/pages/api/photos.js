import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";


export default async function handle(req, res) {
    // if authenticated, connect to mongoDb
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            // fetch a single photo by id
            const photos = await Photo.findById(req.query.id);
            res.json(photos);
        } else {
            // fetch all photos
            const photos = await Photo.find();
            res.json(photos.reverse())
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
   
}