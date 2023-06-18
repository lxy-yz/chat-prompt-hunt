import React from "react";
import prisma from '@/lib/prisma'
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
      upvotedBy: { select: { email: true, image: true } },
      savedBy: { select: { email: true } },
      submittedBy: {
        select: {
          name: true,
          email: true,
          image: true
        },
      },
    },
  });

  if (!chat) return 'No chat found'

  return (
    <div className="pt-20">
      <ChatPromptItem data={chat} />
      <Comments />
    </div>
  );
};

export default Post;
