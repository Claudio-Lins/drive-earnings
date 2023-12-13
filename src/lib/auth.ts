import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  secret: process.env.SECRET,

  jwt: {
    secret: process.env.SECRET,
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!existingUser) return null

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          existingUser.hashedPassword as string
        )
        if (!isPasswordValid) throw new Error("Senha inválida")

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          role: existingUser.role,
        }
      },
    }),
  ],
  // debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      } else {
        return token
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image as string | null | undefined,
          picture: token.picture,
          role: token.role,
        },
      }
    },
  },

  pages: {
    signIn: "/signin",
  },
}
