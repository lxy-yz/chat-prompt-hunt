"use client"

import React from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Post } from './types'

const Post: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div onClick={() => router.push(`/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
