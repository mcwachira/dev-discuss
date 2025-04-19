import {NextResponse} from "next/server"
import {mockComments, mockPosts, mockTags, mockUsers} from "@/data/mockData";
import prisma from "@/lib/prisma";
import SlugifyFunction from "@/lib/slugify";
export async  function POST() {
    if(process.env.NODE_ENV !== "development") {
        return NextResponse.json({error : "Not allowed"} , {status:403})
    }

    try{

        //wipe all existing data
        await prisma.tagsOnPosts.deleteMany()
        await prisma.comment.deleteMany();
        await prisma.user.deleteMany();
        await prisma.post.deleteMany()
        await prisma.tag.deleteMany()

        //create users  Promise.all([...]) is used when you want to run multiple asynchronous operations in parallel and wait for all of them to complete before moving on.
        await Promise.all( mockUsers.map((user) => prisma.user.create({data:user})))

        //create tags
        await Promise.all(mockTags.map((tag) => prisma.tag.create({data:tag})))

        //create post and link tags
        for(const post  of mockPosts){
            const createdPost = await prisma.post.create({
                data:{
                    id: post.id,
                    title: post.title,
                    slug: SlugifyFunction(post.title), // ✅ Required at creation
                    content: post.content,
                    codeSnippet: "",
                    language: "",
                    createdAt: new Date(post.createdAt),
                    updatedAt: new Date(),
                    userId: post.userId,
                    commentCount: post.commentCount,
                    upvotes: post.upvotes,
                    views: post.views,

                },
            })

            //attach tags via TagPosts
            for (const tagName of post.tags) {
                const tag = await prisma.tag.findFirst({where:{name:tagName}})
                if(tag){
                    await prisma.tagsOnPosts.create({
                        data:{
                            postId:createdPost.id,
                            tagId:tag.id
                        }
                    })
                }
            }
        }


        //create comment

        // First create all top-level comments (those with no parent)
      await Promise.all(
            mockComments
                .filter(comment => !comment.parentId)
                .map(comment => prisma.comment.create({
                    data: {
                        id: comment.id,
                        content: comment.content,
                        postId: comment.postId,
                        userId: comment.userId,
                        upvotes: comment.upvotes,
                        createdAt: new Date(comment.createdAt),
                        updatedAt: new Date(),
                        // parentId is null for top-level comments
                    }
                }))
        );

        // Then create all child comments (those with a parent)
        await Promise.all(mockComments .filter(comment => comment.parentId)
            .map((comment) => prisma.comment.create({
            data:{
                id:comment.id,
                content:comment.content,
                createdAt: new Date(comment.createdAt),
                updatedAt:new Date(),
                userId:comment.userId,
                postId:comment.postId,
                parentId:comment.parentId ?? null,
                upvotes:comment.upvotes,
                // replies:comment.replies ?? [],

            },
        })
        )
        )

      


        return   NextResponse.json({message:"sending complete"})
    }catch(err){
        return   NextResponse.json({error:`${err.message}`}, {status:500})
    }
}