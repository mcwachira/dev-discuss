import {PlusCircle} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import PostList from "@/components/PostList";
import {getSortedPosts} from "@/actions";




export default async function Home() {

    //update this to a better way of fetching the post and including users and coments
    const posts = await getSortedPosts("newest");
    console.log(posts);

return (
<>
    <div className="flex min-h-screen">
<main className="flex-1 container max-w-5xl px-4 py-6 pb-24 md:pb-6">
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
            Feed
        </h1>

        <Link href="/post/create">
            <Button className="hidden md:flex">
                <PlusCircle className="mr-2 h-4 w-4"/>

                Create Post
            </Button>
        </Link>
    </div>

    <PostList initialPosts ={posts}/>

</main>

    </div>
</>

)
}
