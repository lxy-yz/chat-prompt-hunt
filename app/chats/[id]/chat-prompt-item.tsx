"use client"

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { StarIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react"
import { ChatPrompt } from "../../types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


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

const Placeholder = () => {
  const head = (
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-400 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-400 rounded col-span-2"></div>
          <div className="h-2 bg-slate-400 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-400 rounded"></div>
      </div>
    </div>
  )
  const chat1 = (
    <div className="flex gap-4">
      <div className="rounded-full bg-slate-400 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div >
  )
  const chat2 = (
    <div className="flex gap-4">
      <div className="self-end order-last rounded-full bg-slate-400 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  )
  const body = (
    <div className="mt-10 flex flex-col gap-8">
      {chat1}
      {chat2}
      {chat1}
    </div>
  )
  const foot = (
    <div className="absolute w-full bottom-0 grid grid-cols-6 gap-4">
      <div className="h-8 bg-slate-400 rounded col-span-5"></div>
      <div className="h-8 bg-slate-400 rounded col-span-1"></div>
    </div>
  )
  return (
    <div className="max-w-[500px] p-10 bg-gray-300 w-full h-full shadow rounded-lg">
      <div className="h-full relative animate-pulse">
        {head}
        {body}
        {foot}
      </div>
    </div>
  )
}

const ChatPromptItem = ({
  data,
  userHasValidSession,
  belongsToUser,
  user
}: {
  data: ChatPrompt,
  userHasValidSession: boolean,
  belongsToUser: boolean
}) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter()
  // const sess = useSession()
  function redirectIfUnauthenticated() {
    // if (!sess) {
    //   router.push("/api/auth/signin")
    //   return true
    // }
  }
  function handleSave(id: string): void {
    throw new Error("Function not implemented.");
  }

  async function handleUpvote(id: string) {
    await fetch(`/api/chats/${id}/upvote`, {
      method: "POST",
    })
  }

  function handleDelete(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="">
        <Link href="/chats" className="inline-flex items-center space-x-3">
          <ChevronLeftIcon className="w-5 h-5 font-semibold" />
          Back
        </Link>
      </div>
      <div className="py-12 flex flex-col md:flex-row md:gap-4">
        <div className="md:w-1/2 min-w-[300px] border-l-gray-300 order-3">
          <div className="h-[576px]">
            {loading && <Placeholder />}
            <iframe
              onLoad={() => setLoading(false)}
              className={cn("h-full w-full rounded-lg", loading && "hidden")}
              src={data.url}
              title="Chat Link"
            ></iframe>
          </div>
        </div>
        <div className="divider md:divider-horizontal order-2"></div>
        <div className="flex-1 min-w-[312px] order-1">
          <h2 className="capitalize font-bold text-5xl">{data.title}</h2>
          <p className="mt-12">{data.description}</p>
          <table className="mt-12 table table-xs">
            <tbody>
              <tr>
                <td>Created</td>
                <td className="text-right">{data.createdAt.toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Topic</td>
                <td>
                  <div className="flex gap-2 justify-end">
                    {data.topic.map((topic) => (
                      <div className="badge badge-outline">{topic}</div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>By</td>
                <td className="text-right">{data.user?.name || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-12 flex justify-end space-x-2">
            <button
              className="btn capitalize"
              onClick={() => handleSave(data.id)}
            >
              <StarIcon className="w-6 h-6" />
              Save
            </button>
            <button
              className={cn("btn btn-outline btn-primary capitalize", {
                "btn-active": data.upvotedBy?.map(e => e.email).includes(user.email),
              })}
              onClick={() => handleUpvote(data.id)}
            >
              {'Upvote ' + data.upvotedBy?.length ?? 0}
              <HandThumbUpIcon className="w-4 h-4" />
            </button>
            {userHasValidSession && belongsToUser && (
              <button
                className="btn btn-outline btn-error capitalize"
                onClick={() => handleDelete(data.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPromptItem;

