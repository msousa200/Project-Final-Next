import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
      
          console.log("Email fornecido:", credentials.email);
          console.log("Senha fornecida:", credentials.password);
      
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
      
          if (!user) {
            console.log("Usuário não encontrado");
            return null;
          }
      
          console.log("Hash armazenado:", user.password);
      
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
      
          console.log("Senha válida?", passwordMatch);
      
          if (!passwordMatch) {
            console.log("Senha incorreta");
            return null;
          }
      
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Erro no authorize:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/login", 
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };