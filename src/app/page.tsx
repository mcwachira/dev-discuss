"use client"

import { useState } from "react";
import { mockPosts } from '@/data/mockData';
import PostFilter from "@/components/PostFilter";
import PostCard from "@/components/PostCard";

export default function Home() {
  const [sortBy, setSortBy] = useState("newest");
  const [timeFrame, setTimeFrame] = useState("all");
  const [activeTab, setActiveTab] = useState("all");


const getSortedPosts = () => {
  let filteredPosts = [...mockPosts]


//popular  posts have  upvotes of more than 25
if (activeTab === 'popular') {
  filteredPosts = filteredPosts.filter(post => post.upvotes > 25);
}

switch (sortBy) {
     case 'popular':
       return filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
     case 'comments':
       return filteredPosts.sort((a, b) => b.commentCount - a.commentCount);
     case 'views':
       return filteredPosts.sort((a, b) => b.views - a.views);
     case 'newest':
     default:
       return filteredPosts.sort((a, b) =>
         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
       );
   }
 };

  const sortedPosts = getSortedPosts();

return (
<>
    <div className="flex min-h-screen">
<main className="flex-1 container max-w-5xl px-4 py-6 pb-24 md:pb-6">
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
            Feed
        </h1>
    </div>

    <div className="bg-background p-0.5 rounded-lg">
        <PostFilter
            sortBy={sortBy}
            setSortBy={setSortBy}
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />

        <div className="space-y-4">
            {sortedPosts.map((post) => (<PostCard key={post.id} post={post}/>))}
        </div>

    </div>
</main>

    </div>
</>

)
}
