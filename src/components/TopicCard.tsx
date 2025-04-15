import {mockTags} from "@/data/mockData";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Hash} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function TopicCard({ tag }: { tag: typeof mockTags[0] }) {

    console.log(tag.name)
    return (
        <Card className="hover:shadow-md transition-shadow">

            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="px-3 py-1 text-base">
                            <Hash className="mr-1 h-4 w-4"/>
                                {tag.name}

                        </Badge>

                        <span className="text-muted-foreground text-sm">
                            {Math.floor(Math.random() * 1000) + 100} posts
                        </span>
                    </div>

                    <Button variant="ghost" size="sm">
                        Follow
                    </Button>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Post about {tag.name} programming, development,practices, libraries and tools
                </p>
            </CardContent>
        </Card>
    )
}