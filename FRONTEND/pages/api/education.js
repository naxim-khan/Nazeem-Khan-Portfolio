import { mongooseConnect } from "@/lib/mongoose";
import  {Education}  from "@/models/Education";

export default async function handle(req, res) {

await mongooseConnect();

const {method} = req;

if (method === 'GET') {
    if (req.query?.id) {
        // fetch a single docx by id
        const product = await Education.findById(req.query.id);
        res.json(product);
    } else if (req.query?.slug) {
        const productBySlug = await Education.find({ slug: req.query.slug });
        res.json(productBySlug.reverse());
    } else {
        // fetch all Docx
        const products = await Education.find();
        res.json(products.reverse());
    }
} else {
    res.status(405).json({ message: 'Method Not Allowed' });
}
}
