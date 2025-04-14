"use client"
import {useState} from "react";
import {mockUsers} from "@/data/mockData";
import {User} from "@/types";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatDistanceToNow} from "date-fns";
import { Button } from "./ui/button";
import {Flag, Reply, ThumbsUp} from "lucide-react";


interface CommentCardProps {
    comment:Comment;
    isReply?:boolean;
    onReply?:(repl:Comment) => void;
}

const CommentCard = ({comment , isReply=false, onReply}:CommentCardProps) => {

    const [upvoted, setUpvoted] = useState(false);
    const [upvotedCount, setUpvotedCount] = useState(comment.upvotes);

    const author = mockUsers.find((user) => user.id === comment.userId) as User;

    const toggleUpvote = () => {
        if (upvoted) {
            setUpvotedCount(prev => prev - 1);
        } else {
            setUpvotedCount(prev => prev + 1);
        }
        setUpvoted(!upvoted);
    };

    const handleReply = () => {
        if (onReply) {
            onReply(comment.id);
        }
    };

    return (

       <div className={cn("py-4 animate-fade-in", isReply ? "ml-8 border-l-2 border-l-muted pl-4":"border-b border-border")}>
 <div className="flex gap-3">
     <HoverCard>
         <HoverCardTrigger asChild>
             <Avatar className="h-8 w-8 cursor-pointer">
                 <AvatarImage src={author.avatar} alt={author.name} />
                 <AvatarFallback>{author.name[0]}</AvatarFallback>
             </Avatar>
         </HoverCardTrigger>

         <HoverCardContent className="w-64">

                           <div className="flex flex-col gap-2">
                               <div className="flex items-center gap-2">
                                   <Avatar className="h-10 w-10">
                                       <AvatarImage src={author.avatar} alt={author.name} />
                                       <AvatarFallback>{author.name[0]}</AvatarFallback>
                                   </Avatar>

                                   <div>
                                       <p className="text-sm font-semibold">{author.name}</p>
                                       <p className="text-xs text-muted-foreground">@{author.username}</p>
                                   </div>
                               </div>
                               <p className="text-sm">
                                   {author.bio || "Developer at dev discuss"}
                               </p>

 </div>
         </HoverCardContent>
     </HoverCard>
         <div className="flex-1">
             <div className="flex items-center gap-2">
                 <span className="font-medium text-sm">{author.name}</span>
                 <span className="text-xs text-muted-foreground">@{author.username}</span>
                 <span className="text-xs text-muted-foreground">•</span>
                 <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
             </div>

             <p className="text-sm mt-1">
                 {comment.content}
             </p>

             <div className="flex gap-2 mt-2">
                 <Button
                     variant="ghost"
                     size="sm"
                     className={cn(
                         "h-7 px-2 text-xs flex items-center gap-1 hover:bg-primary/10 transition-all",
                         upvoted && "text-primary"
                     )}
                     onClick={toggleUpvote}
                 >
                     <ThumbsUp className="h-3 w-3" />
                     <span>{upvotedCount}</span>
                 </Button>
                 {!isReply && (
                     <Button
                         variant="ghost"
                         size="sm"
                         className="h-7 px-2 text-xs flex items-center gap-1 hover:bg-primary/10 transition-all"
                         onClick={handleReply}
                     >
                         <Reply className="h-3 w-3" />
                         <span>Reply</span>
                     </Button>
                 )}
                 <Button
                     variant="ghost"
                     size="sm"
                     className="h-7 px-2 text-xs flex items-center gap-1 ml-auto hover:bg-destructive/10 transition-all"
                 >
                     <Flag className="h-3 w-3" />
                     <span>Report</span>
                 </Button>
             </div>
         </div>
 </div>
       </div>
);
};


export default CommentCard