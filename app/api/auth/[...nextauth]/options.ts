import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;
        try {
          await connectToMongoDB();
          const patelian = await Patelian.findOne({ email });

          if (!patelian) {
            return null;
          }

          const matchPassword = await bcrypt.compare(
            password,
            patelian?.password.toString()
          );

          if (!matchPassword) {
            return null;
          }

          return patelian;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/patelian/login",
    signOut: "/",
  },
};
