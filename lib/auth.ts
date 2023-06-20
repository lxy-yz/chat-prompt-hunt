import { getServerSession } from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    // callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    // callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      };
    }
  }
};

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
