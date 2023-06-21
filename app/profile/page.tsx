import UserForm from "./user-form";

export default async function ProfilePage() {
  return (
    <div className="pt-20">
      <h1 className="text-center text-3xl font-semibold">
        Public Profile
      </h1>
      <div className="mt-10 mx-auto max-w-xl">
        <UserForm />
      </div>
    </div>
  )
}