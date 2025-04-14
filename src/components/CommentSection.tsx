import {Post} from "@/types";
import {useState} from "react";
import {mockComments, mockUsers} from "@/data/mockData";
import {toast} from "sonner";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "./ui/button";
import {ChevronDown, ChevronUp, MessageCircle} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Textarea} from "./ui/textarea";
import CommentCard from "@/components/CommentCard";


interface CommentSectionProps {
    post: Post,
}

const CommentSection = ({post}: CommentSectionProps) => {

    const [commentText, setCommentText] = useState("");
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    //get comments for the posts
    const postComments = mockComments.filter(comment => comment.postId === post.id && !comment.parentId);

    //get replies
    const getReplies = (commentId: string) => mockComments.filter(comment => comment.parentId == commentId);

    const handleSubmitComment = (e: ReactFormEvent) => {
        e.preventDefault();

        if (!commentText.trim()) {
            toast("Comment cannot be empty!", {
                varaint: "destructive"
            })

            return;
        }

        // Here you would normally send this to an API
        toast("Comment submitted", {

            description: "Your comment has been posted successfully!",
        });

        setCommentText('');
        setReplyTo(null);
    }

    const handleReply = (commentId: string) => {
        setReplyTo(commentId)
    }

    const cancelReply = () => {
        setReplyTo(null);
    }
    return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-center gap-2 py-2">
                    <MessageCircle className="h-4 w-4"/>
                    <span>  {post.commentCount} Comments</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="pt-4">
                    <form onSubmit={handleSubmitComment} className="mb-6">
                        <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage src={mockUsers[0].avatar} alt={mockUsers[0].name}/>
                                <AvatarFallback>{mockUsers[0].name[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                {replyTo && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <span>
                                    Replying to comment
                                </span>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={cancelReply}
                                            className="h-6 px-2 text-xs"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}

                                <Textarea placeholder="Write a comment..."
                                          value={commentText}
                                          onChange={e => setCommentText(e.target.value)}
                                          className="resize-none min-h-[100px]"/>

                                <div className="flex justify-end mt-2">
                                    <Button type="submit">
                                        Post Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="space-y-0">
                        {postComments.map((comment) => (
                            <div key={comment.id}>
                                <CommentCard
                                    comment={comment}
                                    onReply={handleReply}
                                />

                                {/* Show replies */}
                                {getReplies(comment.id).map((reply) => (
                                    <CommentCard
                                        key={reply.id}
                                        comment={reply}
                                        isReply={true}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CommentSection