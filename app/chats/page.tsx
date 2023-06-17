import React from "react";
import prisma from "@/lib/prisma";
import ChatPromptItem from "./chat-prompt-item";

const ChatsPage = async () => {
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
        <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...chats, ...chats].map((chat, index) => {
            return (
              <div key={chat.id} className="mx-auto max-w-[320px] w-full h-full">
                <ChatPromptItem data={chat} />
              </div>
            )
          })}
        </main>
      </div>
    </>
  );
};

export default ChatsPage;
