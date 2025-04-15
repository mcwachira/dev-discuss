import {mockUsers} from "@/data/mockData";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Button} from "@/components/ui/button";
import {BookOpen, Code, MessagesSquare} from "lucide-react";

const ContributorCard = ({user}: {user :typeof  mockUsers[0]}) =>{


    return(
        <Card className="hover:shadow-md transition-shadow">

<CardContent className="p-4">
    <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-primary">
                    Follow
                </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {user.bio || `Developer passionate about sharing knowledge and building great software.`}
            </p>
            <div className="flex mt-3 gap-3">
                <div className="flex items-center text-xs text-muted-foreground">
                    <Code className="h-3 w-3 mr-1" />
                    <span>{Math.floor(Math.random() * 50) + 5} posts</span>
                </div>

                <div className="flex items-center text-xs text-muted-foreground">
                    <MessagesSquare className="h-3 w-3 mr-1" />
                    <span>{Math.floor(Math.random() * 200) + 20} comments</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>{Math.floor(Math.random() * 1000) + 100} interactions</span>
                </div>
            </div>
        </div>
    </div>
</CardContent>
        </Card>
    )
}

export default ContributorCard;