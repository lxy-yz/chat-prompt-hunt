import React from "react";
import prisma from "@/lib/prisma";
import ChatPromptItem from "./chat-prompt-item";

const IndexPage = async () => {
  const chats = await prisma.chatPrompt.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
          email: true
        },
      },
    },
  });

  return (
    <>
      <div className="page">
        <h1>Chats</h1>
        <main className="flex gap-4">
          {[...chats, ...chats].map((chat, index) => {
            return (
              <div key={chat.id} className="">
                <ChatPromptItem data={chat} />
              </div>
            )
          })}
        </main>
      </div>
    </>
  );
};

export default IndexPage;
