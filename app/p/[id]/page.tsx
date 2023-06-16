import React from "react";
import { useRouter } from "next/router";
import prisma from '@/lib/prisma'
import { useSession } from "next-auth/react";
import PostItem from "./post-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Post = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!post) return 'No post found'

  const session = await getServerSession(authOptions);
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post?.author?.email;

  return (
    <>
      <PostItem
        post={post}
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
