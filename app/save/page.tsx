import React from "react";
import prisma from "@/lib/prisma";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ChatPromptItem from "../chat-prompt-item";
import { getSession } from "@/lib/auth";

const ChatsPage = async ({
  searchParams
}: {
  searchParams: {
    q?: string
  }
}) => {
  const session = await getSession();
  const chats = await prisma.chatPrompt.findMany({
    where: {
      savedBy: {
        some: {
          id: session?.user.id
        }
      }
    },
    include: {
      submittedBy: {
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
      <div className="h-full">
        <div className="mt-[80px] flex gap-4">
          <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...chats].map((chat, index) => {
              return (
                <div key={chat.id} className="mx-auto max-w-[320px] w-full h-full">
                  <ChatPromptItem data={chat} />
                </div>
              )
            })}
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatsPage;
