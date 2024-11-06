import NextAuth from 'next-auth';
import connectToDatabase from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // Import bcrypt for password comparison

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Connect to MongoDB
        const db = await connectToDatabase();
        const collection = db.collection('admin');

        // Find the user with the provided email
        const user = await collection.findOne({ email: credentials.email });

        // If user exists, compare the entered password with the hashed password in the database
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          // If the password matches, return the user object
          return { Id: user._id, email: user.email };
        } else {
          // If the user doesn't exist or the password is invalid, return null
          return null;
        }
      },
    }),
  ],

  database: process.env.MONGODB_URI,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.Id; // Add user ID to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id; // Add user ID to session
      return session;
    }
  },

  pages: {
    signIn: '/auth/signin', // Sign-in page route
  }
});
