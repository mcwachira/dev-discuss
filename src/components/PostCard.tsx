"use client"
import React, {useState} from 'react';

import {Card, CardContent, CardFooter, CardHeader} from './ui/card';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatDistanceToNow} from "date-fns";
import Link from "next/link";
import CodeSnippet from "@/components/CodeSnippet";
import { Badge } from './ui/badge';
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Bookmark, Eye, MessageSquare, Share2, ThumbsUp} from "lucide-react";
import CommentSection from "@/components/CommentSection";
import {Post} from "@prisma/client";


interface PostCardProps {
    post:Post;
}
function PostCard({post}:PostCardProps) {

    console.log(post)
    const [upvoted, setUpVoted] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [upVotedCount, setUpVotedCount] = useState(post.upvotes);

    // const author = post.find((user) => user.id ===post.userId) as User

    const toggleUpVote = () => {
        if(upvoted){
            setUpVotedCount((prev) => prev + 1)
        }else {
            setUpVotedCount((prev) => prev - 1)
        }
        setUpVoted(!upvoted)
    }

    const toggleBookmark = () => {
        setBookmarked(!bookmarked)
    }

    //check if the content has code snippets
    const hasCodeSnippets = post.content.includes("```");
    const contentParts = post.content.split("```");
    const mainContent= hasCodeSnippets? contentParts[0] :post.content;
    const codeSnippet= hasCodeSnippets && contentParts.length > 1 ?contentParts[1] :"";

    console.log(post)

    return (
      <Card className="mb-4 border animate-fade-in glass-card">

          <CardHeader className='pb-2'>
          <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
          
                  <Avatar>
                      <AvatarImage src={post.user.image} alt={post.user.name} />
                      <AvatarFallback>
                          {post.user.name}
                      </AvatarFallback>
                  </Avatar>
          
                  <div>
                      <h3 className="font-medium">
                          {post.user.name}
                      </h3>
          
                      <p className="text-sm text-muted-foreground">
                          @{post.user.name} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                  </div>
              </div>
          </div>
          </CardHeader>

          <CardContent className="pb-3">
            <Link href={`/post/${post.slug}`}>
             <h2 className="text-xl font-semibold mb-2 hover:text-discuss-primary cursor-pointer">
                 {post.title}
             </h2>
            </Link>

              {/*limits the visible text to 3 lines*/}
              <p className="text-muted-foreground line-clamp-3">
                  {mainContent}
              </p>

              {hasCodeSnippets && codeSnippet && (
            <div className="mt-2 overflow-hidden max-h-[150px] relative">

                <div className="absolute insert-0 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none">
                    <CodeSnippet code={codeSnippet.trim()} language="javascript"/>
                </div>
            </div>
              )}

              {/*<div className="flex flex-wrap gap-2 mt-3">*/}
              {/*    {post.tags.map((tag) => (*/}
              {/*        <Badge key={tag} variant="secondary" className="cursor-pointer">*/}
              {/*    #{tag}*/}
              {/*</Badge>*/}
              {/*        ))}*/}
              {/*</div>*/}
          </CardContent>

          <CardFooter className="pt-0 flex flex-col">

              <div className="flex justify-between w-full mb-2">
                  <div className="flex space-x-3">
                      <Button variant="ghost" size="sm" className={cn("flex items-center gap-1", upvoted && "text-primary")}
                      onClick={toggleUpVote}>
                          <ThumbsUp className="h-4 w-4" />
                          <span>{upVotedCount}</span>

                      </Button>
                      <Link href={`/post/${post.id}`}>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.commentCount}</span>
                          </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                      </Button>
                  </div>

                  <div className="flex space-x-1">

                      <Button className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className={cn("h-8 w-8", bookmarked && "text-primary")} onClick={toggleBookmark}>
                          <Bookmark className="h-4 w-4" />
                      </Button>
                  </div>
              </div>

              {/* Comment Section */}
              <div className="w-full border-t">
                  <CommentSection post={post} />
              </div>
          </CardFooter>
      </Card>
    );
}

export default PostCard;