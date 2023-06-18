import React from "react";
import { useRouter } from "next/router";
import prisma from '@/lib/prisma'
import { useSession } from "next-auth/react";
import PostItem from "../../p/[id]/post-item";
import { getServerSession } from "next-auth";
import { authOptions, getSession } from "@/lib/auth";
import ChatPromptItem from "./chat-prompt-item";
import { Comments } from "./comments";

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
      upvotedBy: { select: { email: true } },
      savedBy: { select: { email: true } },
      submittedBy: {
        select: {
          name: true,
          email: true
        },
      },
    },
  });

  if (!chat) return 'No chat found'

  return (
    <>
      <ChatPromptItem data={chat} />
      <Comments />
    </>
  );
};

export default Post;
