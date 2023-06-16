'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChatPrompt } from "../types";

export const SubmitChatForm = ({ chat }: { chat: ChatPrompt }) => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, },
  } = useForm<ChatPrompt>({
    defaultValues: {
      title: chat?.title || "",
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState('')

  async function onSubmit(data: ChatPrompt) {
    setToast('')
    setIsSaving(true)
    const response = await fetch(`/api/chat-prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        url: data.url,
        category: data.category,
      }),
    })
    setIsSaving(false)

    if (!response?.ok) {
      return setToast("Something went wrong.")
    }

    setToast("Success. Redirecting...")
    router.refresh()
  }

  return (
    <div className="max-w-lg mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
          <div className="mt-1">
            <input
              type="text"
              id="url"
              className="input input-bordered w-full"
              {...register("url", { required: true })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <div className="mt-1">
            <input
              type="text"
              id="category"
              className="input input-bordered w-full"
              {...register("category", { required: true })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <div className="mt-1">
            <textarea
              id="description"
              rows={3}
              className="textarea textarea-bordered w-full"
              {...register("description", { required: true })}
            ></textarea>
          </div>
        </div>
        <div>
          <button disabled={isSaving} type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      {toast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};
