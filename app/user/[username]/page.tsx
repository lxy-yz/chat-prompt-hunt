import ChatPromptItem from '@/app/chat-prompt-item';
import prisma from '@/lib/prisma';
import UserCard from './user-card';

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

  const chats = await prisma.chatPrompt.findMany({
    where: {
      submittedBy: {
        username: params.username
      }
    }
  })

  return (
    <div className="pt-20">
      <h1 className="text-center text-3xl font-semibold">
        Public Profile
      </h1>
      <div className="mt-10 mx-auto max-w-xl">
        <UserCard data={user} />
        <div className="divider"></div>
        <h2 className="text-lg font-semibold">
          Publish
        </h2>
        <div className="mt-6">
          {chats.length === 0 ? (
            <div className="text-gray-500 text-center">
              No prompts published yet
            </div>
          ) : (
            <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...chats].map((chat) => {
                return (
                  <div key={chat.id} className="mx-auto max-w-[320px] w-full h-full">
                    <ChatPromptItem data={chat} />
                  </div>
                )
              })}
            </main>
          )}
        </div>
        {/* <UserForm data={profile} /> */}
      </div>
    </div>
  )
}