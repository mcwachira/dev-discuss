'use client'

import {redirect, useParams, useRouter} from 'next/navigation'
import React, {useState} from "react";
import {mockPosts, mockUsers} from "@/data/mockData";
import {Post, User} from "@/types";
import {toast} from "sonner";
import { Button } from '@/components/ui/button';
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import {Bookmark, Eye, Flag, MessageSquare, MoreHorizontal, Share2, ThumbsUp} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import CodeSnippet from "@/components/CodeSnippet";
import {Textarea} from "@/components/ui/textarea";
import CommentSection from "@/components/CommentSection";

export default  function PostDetailsPage(){

    const params = useParams();
    const slug = params.slug;

    console.log(slug);
    const[upvoted, setUpvoted] = useState<boolean>(false)
    const [bookmarked, setBookmarked] = useState<boolean>(false)
    const [upvotedCount, setUpvotedCount] = useState<number>(0)
    const [comment, setComment] = useState('')

    const router = useRouter()

    const post = mockPosts.find((post) => post.slug === slug) as Post;

    if(!post){
        redirect('/not-found');

    }

    const author = mockUsers.find((user) => user.id === post.userId) as User;

    if(upvotedCount === 0 && post.upvotes >0){
        setUpvotedCount(post.upvotes)
    }

    const toggleUpvote = () => {
        if(upvoted){
            setUpvotedCount((prev) => prev- 1)
        }else {
            setUpvotedCount((prev) => prev + 1)
        }

        setUpvotedCount(!upvoted)
    }

    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
        toast(bookmarked ? "Remove from bookmarks" : " Added to bookmarks")
    }

    const handleCommentSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        if (comment.trim()) {
            // In a real app, you'd send this to your backend
            toast.success('Comment added successfully');
            setComment('');
        }
    }

    // Function to check if the content contains code and extract it
    const hasCodeSnippet = post.content.includes('```');

    // Split content to find code blocks
    const contentParts = post.content.split('```');

    // Assume the content format is: text ```code``` text
    const mainContent = hasCodeSnippet ? contentParts[0] : post.content;
    const codeSnippet = hasCodeSnippet && contentParts.length > 1 ? contentParts[1] : '';

    return (

        <div className="flex min-h-screen">

            <main className="flex-1 container max-w-5xl px-4 py-6 pb-24 md:pb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4"
                >
                    ← Back
                </Button>

                <Card className="border animate-fade-in">
                     <CardContent className="p-6">
                         <div className="flex items-start justify-between mb-4">
<div className="flex items-center space-x-3">
    <Avatar>
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
    </Avatar>

    <div>
        <h3 className="font-medium">
            {author.name}
        </h3>
        <p className="text-sm text-muted-foreground">
            @{author.username} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
    </div>
</div>

                             <Button variant="ghost" size="icon" className="rounded-full">
                                 <MoreHorizontal  className="h-5 w-5"/>
                             </Button>
                         </div>
                         <h1 className="text-2x mb-3">
                             {post.title}
                         </h1>

                         <div className="flex flex-wrap gap-2 mb-4">
                             {post.tags.map((tag) =>(
                                 <Badge key={tag} variant="secondary" className="cursor-pointer">
                                     #{tag}
                                 </Badge>
                             ))}
                         </div>

                         <div className="flex justify-between items-center mt-6 pt-4 border-t">
<p className="whitespace-pre-wrap mb-4">
    {hasCodeSnippet && codeSnippet && (
        <CodeSnippet code={codeSnippet.trim()} language="javascript"/>
    )}
</p>
                         </div>

                         <div className="flex justify-between items-center mt-6 pt-4 border-t">
                             <div className="flex space-x-4">
                                 <Button
                                     variant="ghost"
                                     size="sm"
                                     className={`flex items-center gap-1 ${upvoted ? "text-primary" : ""}`}
                                     onClick={toggleUpvote}
                                 >
                                     <ThumbsUp className="h-4 w-4" />
                                     <span>{upvotedCount}</span>
                                 </Button>
                                 <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                     <MessageSquare className="h-4 w-4" />
                                     <span>{post.commentCount}</span>
                                 </Button>
                                 <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                     <Eye className="h-4 w-4" />
                                     <span>{post.views}</span>
                                 </Button>
                             </div>

                             <div className="flex space-x-2">
                                 <Button className="rounded-full">
                                     <Share2 className="h-4 w-4"/>
                                 </Button>

                                 <Button
                                     variant="ghost"
                                     size="icon"
                                     className={`rounded-full ${bookmarked ? "text-primary" : ""}`}
                                     onClick={toggleBookmark}
                                 >
                                     <Bookmark className="h-4 w-4" />
                                 </Button>
                                 <Button variant="ghost" size="icon" className="rounded-full">
                                     <Flag className="h-4 w-4" />
                                 </Button>
                             </div>
                         </div>
                     </CardContent>
                </Card>

                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">
                        Comments ({post.commentCount})
                    </h2>

                {/*    use actions*/}

                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <Textarea placeholder="Add a comment..."
                        value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  className="mb-2"
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={!comment.trim()}>
                                Post Comment
                            </Button>
                        </div>
                    </form>

                    <CommentSection post={post}/>
                </div>
            </main>

        </div>

    )
}