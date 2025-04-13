import { User, Post, Comment, Tag } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "mcwachira",
    name: "Michael Wachira",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "Full-stack developer with a passion for React and Node.js",
  },
  {
    id: "2",
    username: "sarahdev",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Frontend specialist exploring the latest web technologies",
  },
  {
    id: "3",
    username: "devguru",
    name: "Alex Patel",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Software architect with 10+ years of experience",
  },
  {
    id: "4",
    username: "codemaster",
    name: "Jessica Chen",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Python enthusiast and machine learning engineer",
  },
];

export const mockTags: Tag[] = [
  {
    id: "1",
    name: "javascript",
    color: "#F0DB4F",
  },
  {
    id: "2",
    name: "react",
    color: "#61DAFB",
  },
  {
    id: "3",
    name: "nextjs",
    color: "#000000",
  },
  {
    id: "4",
    name: "typescript",
    color: "#3178C6",
  },
  {
    id: "5",
    name: "css",
    color: "#264DE4",
  },
  {
    id: "6",
    name: "nodejs",
    color: "#339933",
  },
  {
    id: "7",
    name: "python",
    color: "#3776AB",
  },
  {
    id: "8",
    name: "webdev",
    color: "#E34F26",
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "I think Next.js is a great framework for React. It makes server-side rendering and static site generation really easy.",
    createdAt: "2023-04-10T10:30:00Z",
    userId: "2",
    postId: "1",
    upvotes: 8,
    replies: ["2", "3"],
  },
  {
    id: "2",
    content:
      "I agree! The file-based routing is also a nice feature that simplifies navigation setup.",
    createdAt: "2023-04-10T11:15:00Z",
    userId: "3",
    postId: "1",
    parentId: "1",
    upvotes: 5,
  },
  {
    id: "3",
    content:
      "The new App Router in Next.js 13 is game-changing but has a steeper learning curve.",
    createdAt: "2023-04-10T12:45:00Z",
    userId: "4",
    postId: "1",
    parentId: "1",
    upvotes: 3,
  },
  {
    id: "4",
    content:
      "Have you tried using the useEffect hook with an empty dependency array for this? It should only run once after the initial render.",
    createdAt: "2023-04-11T09:30:00Z",
    userId: "3",
    postId: "2",
    upvotes: 6,
  },
  {
    id: "5",
    content:
      "For async operations, I recommend looking into React Query or SWR to manage your data fetching and caching needs.",
    createdAt: "2023-04-11T10:20:00Z",
    userId: "2",
    postId: "2",
    upvotes: 7,
  },
  {
    id: "6",
    content:
      "CSS Grid is better for two-dimensional layouts where you need to control both rows and columns.",
    createdAt: "2023-04-12T15:10:00Z",
    userId: "1",
    postId: "3",
    upvotes: 9,
  },
  {
    id: "7",
    content:
      "Flexbox is usually my go-to for one-dimensional layouts or when I need items to be flexible in size.",
    createdAt: "2023-04-12T16:45:00Z",
    userId: "2",
    postId: "3",
    upvotes: 8,
    replies: ["8"],
  },
  {
    id: "8",
    content:
      "Agreed! I use Flexbox for navigation menus and simple alignments, but Grid for more complex page layouts.",
    createdAt: "2023-04-12T17:30:00Z",
    userId: "4",
    postId: "3",
    parentId: "7",
    upvotes: 4,
  },
  {
    id: "9",
    content:
      "I recommend using interfaces for props and extending existing interfaces when needed.",
    createdAt: "2023-04-13T13:20:00Z",
    userId: "3",
    postId: "4",
    upvotes: 6,
  },
  {
    id: "10",
    content:
      'Don\'t forget to use the "as const" assertion for action type literals to make your Redux types more strict.',
    createdAt: "2023-04-13T14:15:00Z",
    userId: "1",
    postId: "4",
    upvotes: 5,
  },
  {
    id: "11",
    content:
      "JWT authentication with refresh tokens is what I use for most of my Node.js APIs.",
    createdAt: "2023-04-14T18:00:00Z",
    userId: "1",
    postId: "5",
    upvotes: 7,
  },
  {
    id: "12",
    content:
      "Consider using middleware for auth validation across multiple routes to keep your code DRY.",
    createdAt: "2023-04-14T19:30:00Z",
    userId: "3",
    postId: "5",
    upvotes: 8,
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "What do you think of Next.js?",
    content:
      "I've been using Next.js for a few months now and I'm really impressed with its features. What are your thoughts on it? Do you prefer it over other frameworks?",
    createdAt: "2023-04-10T10:00:00Z",
    userId: "1",
    tags: ["nextjs", "react", "javascript"],
    commentCount: 3,
    upvotes: 42,
    views: 320,
    comments: ["1"],
  },
  {
    id: "2",
    title: "Async Await in JavaScript",
    content:
      "I'm having trouble understanding how to properly use async/await in JavaScript. Can someone explain the best practices for error handling and avoiding common pitfalls?",
    createdAt: "2023-04-11T09:00:00Z",
    userId: "1",
    tags: ["javascript", "async"],
    commentCount: 2,
    upvotes: 28,
    views: 245,
    comments: ["4", "5"],
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox - When to use which?",
    content:
      "I'm confused about when to use CSS Grid and when to use Flexbox. They seem to overlap in functionality. Could someone clarify the use cases for each?",
    createdAt: "2023-04-12T14:20:00Z",
    userId: "3",
    tags: ["css", "webdev"],
    commentCount: 3,
    upvotes: 35,
    views: 410,
    comments: ["6", "7"],
  },
  {
    id: "4",
    title: "TypeScript best practices for React",
    content:
      "I'm starting a new React project and want to use TypeScript properly. What are some best practices and common patterns for typing components, props, and state?",
    createdAt: "2023-04-13T11:45:00Z",
    userId: "2",
    tags: ["typescript", "react"],
    commentCount: 2,
    upvotes: 31,
    views: 288,
    comments: ["9", "10"],
  },
  {
    id: "5",
    title: "Setting up a Node.js API with Express and MongoDB",
    content:
      "I'm trying to create a REST API using Node.js, Express, and MongoDB. What's the best way to structure the project and handle authentication?",
    createdAt: "2023-04-14T16:30:00Z",
    userId: "4",
    tags: ["nodejs", "express", "mongodb"],
    commentCount: 2,
    upvotes: 24,
    views: 270,
    comments: ["11", "12"],
  },
];
