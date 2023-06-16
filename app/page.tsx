import React from "react";
import prisma from "@/lib/prisma";
import PostItem from "./post-item";

const IndexPage = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.map((post) => (
            <div key={post.id} className="post">
              <PostItem post={post} />
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default IndexPage;
