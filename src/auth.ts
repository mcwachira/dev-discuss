import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

//check if either is missing

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error("Missing Github oauth credentials");
}

const authOptions:NextAuthConfig = {
    callbacks:{
        async signIn({profile}){

            // Change this to your username
            return profile?.login === "mcwachira";
        },
        async session ({session, user}:any){
            if(session && user){
                session.user.id = user.id;
            }

            return session;
        },
    },

    adapter:PrismaAdapter(prisma),
    providers:[
        GitHubProvider({
            clientId: GITHUB_CLIENT_ID ?? "",
            clientSecret: GITHUB_CLIENT_SECRET ?? "",
        })
    ],
    basePath: "/api/auth",
    secret: process.env.NEXTAUTH_SECRET,
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(authOptions);