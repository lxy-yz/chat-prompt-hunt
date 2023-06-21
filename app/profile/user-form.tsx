"use client"

import { useForm } from "react-hook-form";

interface UserProfile {
  name: string;
  username: string; //backfill
  email: string;
  bio?: string
  profileImage?: string
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


  return (
    <form className="flex flex-col md:flex-row md:gap-4">
      <div className="md:order-1">
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Avatar</label>
        <div className="mt-4 bg-gray-900 rounded-full relative md:w-[200px] md:h-[200px]">
          <input
            type="file"
            className="cursor-pointer absolute left-0 top-0 opacity-0 w-full h-full"
          />
        </div>
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