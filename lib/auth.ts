import { getServerSession } from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

export const authOptions = {
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
  secret: process.env.SECRET
};

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
