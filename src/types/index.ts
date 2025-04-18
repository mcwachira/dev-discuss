export interface User {
  id: string;
  username: string;
  name: string;
  image: string;
  bio?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  tags: string[];
  commentCount: number;
  upvotes: number;
  views: number;
  comments?: string[]; // Array of comment IDs
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  postId: string;
  parentId?: string; // For nested comments
  upvotes: number;
  replies?: string[]; // Array of reply IDs (which are also comments)
}
