"use client"
import { useState } from "react";

import PostFilter from "@/components/PostFilter";
import PostCard from "@/components/PostCard";
import {Post} from "@prisma/client";


export default function PostList({posts}:Post){

    const [sortBy, setSortBy] = useState("newest");
    const [timeFrame, setTimeFrame] = useState("all");
    const [activeTab, setActiveTab] = useState("all");



    //change this to fetch post from db
    const getSortedPosts = () => {
        let filteredPosts = [...posts]


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
    )

}