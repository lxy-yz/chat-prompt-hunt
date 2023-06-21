"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";

interface UserProfile {
  name: string;
  username: string; //backfill
  email: string;
  bio?: string
  profileImage?: FileList
}

export default function UserForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, },
  } = useForm<UserProfile>({
    defaultValues: {
    },
  })

  const [previewImageUrl, setPreviewImageUrl] = useState('')

  return (
    <form
      onSubmit={handleSubmit(async ({ profileImage }) => {
        fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            profileImage: await fileToBase64(profileImage[0] as File)
          })
        })
      })}
      className="flex flex-col md:flex-row md:gap-4">
      <div className="md:order-1">
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Avatar</label>
        <div
          style={{ backgroundImage: `url("${previewImageUrl}")` }}
          className="bg-cover bg-center mt-4 bg-gray-900 rounded-full relative md:w-[200px] md:h-[200px]">
          <input
            {...register('profileImage', {
              required: false,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                const image = event.currentTarget.files[0] as File;
                setPreviewImageUrl(URL.createObjectURL(image))
              }
            })}
            type="file"
            className="cursor-pointer absolute left-0 top-0 opacity-0 w-full h-full"
          />
        </div>
        <input type="submit" value="Submit" />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            className="input input-bordered w-full"
            {...register("email", { required: false })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            placeholder="Tell us a bit about yourself"
            rows={3}
            className="textarea textarea-bordered w-full"
            {...register("bio", { required: false })}
          ></textarea>
        </div>
      </div>
    </form>
  )
}

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}