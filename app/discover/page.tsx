import React from "react";
import prisma from "@/lib/prisma";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ChatPromptItem from "../chat-prompt-item";

const ChatsPage = async ({
  searchParams
}: {
  searchParams: {
    q?: string
  }
}) => {
  const chats = await prisma.chatPrompt.findMany({
    where: {
      title: {
        contains: searchParams.q,
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
      <div className="">
        <h1 className="text-center text-5xl font-bold">Discover Chats</h1>
        {/* TODO: */}
        <div className="text-center mt-6 text-xl text-gray-500">
          {/* Jumpstart your app development process with our pre-built solutions. */}
          <form>
            <div className="form-control">
              <div className="justify-center input-group">
                <input name="q" type="text" placeholder="Search…" className="w-full md:w-1/2 input input-bordered" />
                <button className="btn btn-square">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-[80px] flex gap-4">
          {/* <div className="w-[300px] bg-neutral-200">

          </div> */}
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
