"use client"

import { useState } from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { StarIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react"
import { ChatPrompt, User } from "../../types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Placeholder } from "./placeholder";

const ChatPromptItem = ({
  data,
}: {
  data: ChatPrompt,
}) => {
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession()
  const belongsToUser = session?.user?.email === data.submittedBy?.email
  const savedByUser = data.savedBy?.map(e => e.email).includes(session?.user?.email as string)
  const upvotedByUser = data.upvotedBy?.map(e => e.email).includes(session?.user?.email as string)

  const router = useRouter()

  function redirectIfUnauthenticated() {
    if (!session) {
      router.push("/login")
      return true
    }
    return false
  }

  async function handleSave(id: string) {
    redirectIfUnauthenticated()

    const url = !savedByUser ? `/api/chats/${id}/save` : `/api/chats/${id}/unsave`
    await fetch(url, {
      method: "POST",
    })
    router.refresh()
  }

  async function handleUpvote(id: string) {
    redirectIfUnauthenticated()

    const url = !upvotedByUser ? `/api/chats/${id}/upvote` : `/api/chats/${id}/downvote`
    await fetch(url, {
      method: "POST",
    })
    router.refresh()
  }

  function handleDelete(id: string) {
    redirectIfUnauthenticated()

    if (confirm('Are you sure you want to delete this?')) {
      fetch(`/api/chats/${id}`, {
        method: "DELETE",
      })
      router.push('/chats')
    }
  }

  return (
    <>
      <div className="">
        <button onClick={() => router.back()} className="inline-flex items-center space-x-3">
          <ChevronLeftIcon className="w-5 h-5 font-semibold" />
          Back
        </button>
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
                      <div key={topic} className="badge badge-outline">{topic}</div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>By</td>
                <td className="text-right">{data.submittedBy?.name || 'N/A'}</td>
              </tr>
              <tr>
                <td>Upvotes</td>
                <td className="flex justify-end">
                  <div className="avatar-group -space-x-6">
                    {data.upvotedBy?.slice(0, 3).map(e => (
                      <div className="avatar">
                        <div className="w-12">
                          <img src={e.image} />
                        </div>
                      </div>
                    ))}
                    <div className="avatar placeholder">
                      <div className="w-12 bg-neutral-focus text-neutral-content">
                        <span>3+</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-12 flex justify-end space-x-2">
            <button
              className={cn("btn btn-outline capitalize", {
                "btn-active": savedByUser
              })}
              onClick={() => handleSave(data.id)}
            >
              <StarIcon className="w-6 h-6" />
              Save
            </button>
            <button
              className={cn("btn btn-outline btn-primary capitalize", {
                "btn-active": upvotedByUser
              })}
              onClick={() => handleUpvote(data.id)}
            >
              {'Upvote ' + data.upvotedBy?.length ?? 0}
              <HandThumbUpIcon className="w-4 h-4" />
            </button>
            {session && belongsToUser && (
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

