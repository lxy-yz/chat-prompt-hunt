import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/lib/prisma'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

