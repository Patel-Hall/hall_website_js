import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

interface Credentials{
    email:string,
    password:string,
}

export const authOptions: NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"email",
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"password",
                },
            },
            async authorize(credentials){
                const {email,password}=credentials as Credentials;
                try {
                    await connectToMongoDB();
                    const user=await User.findOne({email});

                    
                    if(!user){
                        return null;
                    }
                    

                    const matchPassword=await bcrypt.compare(password,user?.password.toString());

                    if(!matchPassword){
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ",error);
                }
            }
        })
    ],
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/admin/login",
    }
}

const handler=NextAuth(authOptions);

export {handler as GET,handler as POST};