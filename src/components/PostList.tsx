"use client"
import {useState, useTransition} from "react";

import PostFilter from "@/components/PostFilter";
import PostCard from "@/components/PostCard";
import {Post} from "@prisma/client";
import {getSortedPosts} from "@/actions";


export default function PostList({initialPosts}:Post){

    const [posts, setPosts] = useState(initialPosts);
    const [sortBy, setSortBy] = useState("newest");
    const [timeFrame, setTimeFrame] = useState("all");
    const [activeTab, setActiveTab] = useState("all");
    const [isPending, startTransition] = useTransition();



const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
   // useTransition lets you defer a state update so the UI doesn’t freeze while waiting.
    startTransition(async() => {
        const newPosts = await getSortedPosts(newSortBy)

        setPosts(newPosts)
    })
}

    return (
        <div className="bg-background p-0.5 rounded-lg">
            <PostFilter
                sortBy={sortBy}
                setSortBy={handleSortChange}
                timeFrame={timeFrame}
                setTimeFrame={setTimeFrame}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {isPending && <p className="text-muted">Loading...</p>}
            <div className="space-y-4">
                {posts.map((post) => (<PostCard key={post.id} post={post}/>))}
            </div>

        </div>
    )

}