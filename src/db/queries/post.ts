import type { Post, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
export type PostWithData = Post &{
    user:{ name: string | null; image: string | null }
    comments:{ comment: string | null }
    tag:{ tag: string | null }
    _count: { comments: number };
}


type FetchPostsOptions = {
    where?:     Prisma.PostWhereInput,
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[] | { _count: { comments: "asc" | "desc" } },

    take?: number,
    skip?: number,
}
const postRelations = {
    user:{select:{name:true, image:true}},

    comments:{
        select:{
            user:{select:{name: true, image: true}},
        }
    },
    TagsOnPosts:{
        include:{
            tag:{
                select:{id:true,name:true}
            }
        }
    },
    _count: { select: { comments: true } },
}



//fetch core
function fetchPostCore({
    where, orderBy,take, skip
                       }: FetchPostsOptions){
    return prisma.post.findMany({
        where,
        orderBy,
        take,
        skip,
        include:postRelations

    })
}

//fetch all posts
export const fetchAllPosts = (opts?: FetchPostsOptions) => fetchPostCore({
    orderBy:{
        createdAt:"desc"},
     ...opts
})


const MIN_POPULAR = 10

//fetch popular posts
export const fetchPopularPosts = (opts?: FetchPostsOptions) => fetchPostCore({where:{
    upvotes:{
        gte:MIN_POPULAR
    }
    }, orderBy:{upvotes:"desc"}, ...opts})



//fetch most commented
export const fetchMostCommented = async (opts?: FetchPostsOptions) => {
    const posts = await fetchPostCore({ ...opts });

    return posts.sort((a, b) => b._count.comments - a._count.comments);
};


//fetch post by topics
export const fetchPostByTopics = (tagName:string, opts?: FetchPostsOptions) => fetchPostCore({where:{TagsOnPosts:{
    some:{tag:{name:tagName}}
        }}, ...opts})

//fetch post by most viewed
export const fetchPostByMostViewed = (opts?: FetchPostsOptions) => fetchPostCore({orderBy:{views:"desc"}, ...opts})