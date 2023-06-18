export type Post = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

export type ChatPrompt = {
  id: string;
  title: string;
  description: string;
  url: string;
  topic: string[];
  createdAt: Date;
  upvotedBy: User[] | null;
  submittedBy: User[] | null;
};

type User = {
  email: string;
  name: string;
};
