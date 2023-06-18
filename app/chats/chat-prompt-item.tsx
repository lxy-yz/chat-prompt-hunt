"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { ChatPrompt } from '../types'
import Link from "next/link";

const ChatPromptItem = ({ data }: { data: ChatPrompt }) => {

  return (
    <Link href={`/chats/${data.id}`}>
      <div className="h-full card rounded bg-base-100 shadow-xl">
        <figure className="h-[180px] bg-slate-300">
          <img className="w-full bg-cover" src="https://picsum.photos/200/300" alt="" />
          {/* <iframe
            className="w-full h-[500px] overflow-hidden"
            src={'https://chat.openai.com/share/a82a7f96-42c3-406c-8e36-fb8d04364573'}
            title="Chat Link"
          ></iframe> */}
        </figure>
        <div className="p-4 gap-1 card-body">
          <h2 className="text-base capitalize card-title">{data.title}</h2>
          <p className="text-gray-700">{data.description}</p>
          <div className="mt-3 card-actions justify-end">
            <button className="btn btn-primary">🔺 Upvote</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatPromptItem;
