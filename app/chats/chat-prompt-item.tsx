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
          {/* <iframe
            className="w-full h-[500px] overflow-hidden"
            src={'https://chat.openai.com/share/a82a7f96-42c3-406c-8e36-fb8d04364573'}
            title="Chat Link"
          ></iframe> */}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p>{data.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">🔺 Upvote</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatPromptItem;
