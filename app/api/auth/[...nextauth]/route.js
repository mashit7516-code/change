// Force Node runtime — critical for bcrypt + MongoDB
export const runtime = "nodejs";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

// Export GET and POST handlers for NextAuth
export const GET = async (req, res) => {
  return NextAuth(req, res, nextAuthOptions);
};
export const POST = GET;

// NextAuth options
export const nextAuthOptions = {
  providers: [
    // Google Login
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Custom Email/Password Login
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username || user.email.split("@")[0],
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.name || user.email.split("@")[0],
          });
        }

        return true;
      } catch (error) {
        console.error("❌ signIn error:", error);
        return false;
      }
    },

    async session({ session }) {
      if (!session?.user?.email) return session;

      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email }).lean();

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.name = dbUser.username;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};