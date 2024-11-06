import { mongooseConnect } from "@/lib/mongoose";
import { Profile } from "@/models/Profile";
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords

export default async function handler(req, res) {
    await mongooseConnect();

    // Extract email and password from the request body
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Profile.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

        // Create a new user with the hashed password
        const newUser = await Profile.create({ email, password: hashedPassword });

        // Return success response
        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err); // Log error to server logs
        res.status(500).json({ error: 'Server error' });
    }
}
