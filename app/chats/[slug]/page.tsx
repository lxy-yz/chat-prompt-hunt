import React from "react";
import prisma from '@/lib/prisma'
import ChatPromptItem from "./chat-prompt-item";
import { Comments } from "./comments";

const ChatDetailsPage = async ({ params }: {
  params: {
    slug: string
  }
}) => {
  const chat = await prisma.chatPrompt.findUnique({
    where: {
      slug: params.slug,
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

export default ChatDetailsPage;
