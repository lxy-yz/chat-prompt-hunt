import prisma from '@/lib/prisma';

export default async function UserPage({
  params
}: {
  params: {
    username: string
  }
}) {
  const user = await prisma.user.findFirst({
    where: {
      username: params.username
    },
  });

  return (
    <div className="pt-20">
      <h1 className="text-center text-3xl font-semibold">
        Public Profile
      </h1>
      <div className="mt-10 mx-auto max-w-xl">
        <div className="flex gap-4">
          <div className="avatar">
            <div className="w-36 rounded-full">
              <img src={user?.image} alt="" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-2xl">{user?.name}</div>
            <div className="">{user?.bio}</div>
          </div>
        </div>
        {/* <UserForm data={profile} /> */}
      </div>
    </div>
  )
}