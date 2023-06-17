"use client"

import Link from "next/link";
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ChatPrompt, Post } from "../../types";


async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  // await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  // await Router.push("/")
}

const ChatPromptItem = ({
  data,
  userHasValidSession,
  belongsToUser
}: {
  data: ChatPrompt,
  userHasValidSession: boolean,
  belongsToUser: boolean
}) => {
  return (
    <>
      <div className="flex">
        <div className="w-[600px] border-l border-l-gray-300 order-last">
          <div className="px-12 py-6">
            <iframe
              className="w-full rounded-lg"
              src={data.url}
              title="Chat Link"
              height="500px"
            ></iframe>
          </div>
        </div>
        <div className="flex-1 pr-8">
          <Link href="/chats" className="inline-flex items-center space-x-3">
            <ChevronLeftIcon className="w-5 h-5 font-semibold" />
            Back
          </Link>
          <h2 className="my-8 font-bold text-5xl">{data.title}</h2>
          <p className="mt-4">{data.description}</p>
          <p className="mt-4">By {data.user?.name || "Unknown author"}</p>
          {/* {!data.published && userHasValidSession && belongsToUser && (
            <button onClick={() => publishPost(data.id)}>Publish</button>
          )} */}
          {userHasValidSession && belongsToUser && (
            <button onClick={() => deletePost(data.id)}>Delete</button>
          )}
        </div>
      </div>
      {/* <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style> */}
    </>
  );
};

export default ChatPromptItem;
