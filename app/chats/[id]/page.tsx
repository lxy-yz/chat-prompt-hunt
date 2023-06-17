import React from "react";
import { useRouter } from "next/router";
import prisma from '@/lib/prisma'
import { useSession } from "next-auth/react";
import PostItem from "../../p/[id]/post-item";
import { getServerSession } from "next-auth";
import { authOptions, getSession } from "@/lib/auth";

const Post = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const chat = await prisma.chatPrompt.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (!chat) return 'No chat found'

  const session = await getSession();
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === chat?.user?.email;

  return (
    <>
      <PostItem
        post={chat}
        postBelongsToUser={postBelongsToUser}
        userHasValidSession={userHasValidSession}
      />
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

export default Post;
