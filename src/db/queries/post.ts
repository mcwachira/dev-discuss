import type { Post } from "@prisma/client";
import prisma from "@/lib/prisma";
export type PostWithData = Post &{
    user:{ name: string | null; image: string | null }
}

//fetch all posts
export function fetchPosts():Promise<PostWithData[]> {

    return prisma.post.findMany({
    include: {
        user:{select:{name:true, image:true}}
    }
    })
}