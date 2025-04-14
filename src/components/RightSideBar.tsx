"use client"
import {
    PlusCircle,
    TrendingUp,
    BarChart3,
    HelpCircle,
    ChevronRight
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockTags, mockUsers } from '@/data/mockData';
import {useState} from "react";
import Link from "next/link";

export default function RightSideBar() {

    const [trendingTags, setTrendingTags] = useState(mockTags.slice(0, 5));
    return (
        <div className="hidden lg:flex flex-col w-80 space-y-6 sticky top-20 h-[calc(100vh-6rem)] overflow-auto pb-8 pl-2 scrollbar-hide">
            <Card className="shadow-sm glass-card">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Create New Post</CardTitle>
                    <CardDescription>Share your knowledge with the community</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" size="lg">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Post
                    </Button>
                </CardContent>
            </Card>
            <Card className="shadow-sm glass-card">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trending Topics
                    </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="space-y-2">
                        {trendingTags.map((tag) => (
                            <div key={tag.id} className="flex items-center justify-between">
                                <Badge variant="outline" className="px-3 py-1 cursor-pointer">
                                    #{tag.name}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 100) + 10} posts
                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-devdiscuss-primary" asChild>
                        <Link href="/topics">
                            See all topics
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card className="shadow-sm glass-card">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Top Contributors
                    </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="space-y-3">
                        {mockUsers.map((user) => (
                            <div key={user.id} className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                    Follow
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-devdiscuss-primary" asChild>
                        <Link href="/contributors">
                            View all
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <Card className="shadow-sm glass-card">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Need Help?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Get help from our community or read through our guides and tutorials.
                    </p>
                    <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                            Community
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                            Guides
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}