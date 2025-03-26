/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // Copie toda sua configuração atual aqui
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email e senha são obrigatórios");
          }
      
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
      
          if (!user) {
            throw new Error("Email não encontrado");
          }
          
          // Check password and then transform the user object to match NextAuth User type
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
      
          if (!passwordMatch) {
            throw new Error("Senha incorreta");
          }
          
          // Transform the user object to match NextAuth's User type
          return {
            id: user.id,
            email: user.email,
            name: user.name || undefined, // Convert null to undefined
          };
        } catch (error) {
          console.error("Erro no authorize:", error);
          throw error;
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
    async redirect({ url, baseUrl }) {
      try {
        if (!url) return baseUrl || '/';
    
        try {
          new URL(url);
        } catch {
          if (url.startsWith('/')) {
            url = `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
          } else {
            return baseUrl || '/';
          }
        }
    
        if (url.includes('/checkout')) {
          return url;
        }
        
        if (url.startsWith(baseUrl) || url.startsWith('/')) {
          if (url.includes('/login') || url === baseUrl) {
            return '/';
          }
          return url;
        }
        
        return baseUrl || '/';
      } catch (error) {
        console.error("URL redirection error:", error);
        return baseUrl || '/';
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};