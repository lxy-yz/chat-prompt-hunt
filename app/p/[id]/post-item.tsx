"use client"

import ReactMarkdown from "react-markdown";
import { Post } from "../../types";

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  // await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  // await Router.push("/")
}

const PostItem = ({
  post,
  userHasValidSession,
  postBelongsToUser
}: {
  post: Post,
  userHasValidSession: boolean,
  postBelongsToUser: boolean
}) => {
  let title = post.title;
  if (!post.published) {
    title = `${title} (Draft)`;
  }

  return (
    <>
      <div className="flex">
        <div className="w-[600px] border-l border-l-gray-300 order-last">
          <div className="px-12 py-6">
            <iframe
              className="w-full rounded-lg"
              src={'https://chat.openai.com/share/a82a7f96-42c3-406c-8e36-fb8d04364573'}
              title="Chat Link"
              height="500px"
            ></iframe>
          </div>
        </div>
        <div className="flex-1">
          <h2>{title}</h2>
          <p>By {post.author?.name || "Unknown author"}</p>
          <ReactMarkdown children={post.content} />
          {!post.published && userHasValidSession && postBelongsToUser && (
            <button onClick={() => publishPost(post.id)}>Publish</button>
          )}
          {userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(post.id)}>Delete</button>
          )}
        </div>
      </div>
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

export default PostItem;
