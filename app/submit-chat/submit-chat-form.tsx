'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChatPrompt } from "../types";
import Picker from "@emoji-mart/react";
import pickerData from '@emoji-mart/data'

const URL_PATTERN = /^(https?:\/\/)?chat\.openai\.com\/share\/(.*)$/i;

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
        category: emoji // data.category,
      }),
    })
    setIsSaving(false)

    if (!response?.ok) {
      return setToast("Something went wrong.")
    }

    setToast("Success. Redirecting...")
    router.push(`/chats/${chat.id}`)
  }

  const [emoji, setEmoji] = useState('🤖')

  return (
    <div className="max-w-lg mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Topic</label>
          <div className="dropdown">
            <label tabIndex={0} className="btn text-3xl w-24 h-24">{emoji}</label>
            <div tabIndex={0} className="dropdown-content">
              <div className="mt-4">
                {/* @ts-ignore */}
                <Picker data={pickerData} onEmojiSelect={(selected) => setEmoji(selected.native)} />
              </div>
            </div>
          </div>
          {/* <input
            type="text"
            id="category"
            className="input input-bordered w-full"
            placeholder="e.g. GPT-4, AI Dungeon, etc."
            {...register("category", { required: true })}
          />
          {errors.category?.type === 'required' && (
            <span className="self-end text-sm text-neutral">This field is required</span>
          )} */}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">Chat url</label>
          <input
            type="url"
            id="url"
            className="input input-bordered w-full"
            placeholder="e.g. https://chat.openai.com/share/123456789"
            {...register("url", {
              required: true,
              pattern: URL_PATTERN,
            })}
          />
          {errors.url?.type === 'required' && (
            <span className="self-end text-sm text-neutral">This field is required</span>
          )}
          {errors.url?.type === 'pattern' && (
            <span className="self-end text-sm text-neutral">Invalid chat sharing url</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            className="input input-bordered w-full"
            placeholder="What's your chat about?"
            {...register("title", { required: true })}
          />
          {errors.title?.type === 'required' && (
            <span className="self-end text-sm text-neutral">This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder="Describe your chat prompt here"
            rows={5}
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description?.type === 'required' && (
            <span className="self-end text-sm text-neutral">This field is required</span>
          )}
        </div>
        <div>
          <button disabled={isSaving} type="submit" className="capitalize btn btn-primary">Submit</button>
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
