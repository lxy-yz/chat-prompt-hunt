import React from "react";
import { useRouter } from "next/router";
import prisma from '@/lib/prisma'
import { useSession } from "next-auth/react";
import PostItem from "../../p/[id]/post-item";
import { getServerSession } from "next-auth";
import { authOptions, getSession } from "@/lib/auth";
import ChatPromptItem from "./chat-prompt-item";

const Post = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const chat = await prisma.chatPrompt.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (!chat) return 'No chat found'

  const session = await getSession();
  const userHasValidSession = Boolean(session);
  const belongsToUser = session?.user?.email === chat?.user?.email;

  return (
    <>
      <ChatPromptItem
        data={chat}
        belongsToUser={belongsToUser}
        userHasValidSession={userHasValidSession}
      />
    </>
  );
};

export default Post;
