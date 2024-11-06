import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Shop";

export default async function handle(req, res) {

await mongooseConnect();

const {method} = req;

if (method === 'GET') {
    if (req.query?.id) {
        // fetch a single product by id
        const product = await Product.findById(req.query.id);
        res.json(product);
    } else if (req.query?.slug) {
        const productBySlug = await Product.find({ slug: req.query.slug });
        res.json(productBySlug.reverse());
    } else {
        // fetch all products
        const products = await Product.find();
        res.json(products.reverse());
    }
} else {
    res.status(405).json({ message: 'Method Not Allowed' });
}
}
