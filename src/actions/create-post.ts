"use server"
import type {Post} from "@prisma/client"
import {auth} from "@/auth"
import {z} from "zod"
import prisma from "@/lib/prisma"
import {redirect} from "next/navigation"
import {revalidatePath} from "next/cache";
import SlugifyFunction from "@/lib/slugify";

const createPostSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
    tags:z.array(z.string())
})

interface CreatePostFormState {
    errors: {
        title?: string[];
        content?: string[];
        tags?: string[];
        _form?:string[]
    }
}

export async function createPost(
    formState:CreatePostFormState,
    formData:FormData
):Promise<CreatePostFormState> {


    const rawTags = formData.get("tags");
    let parsedTags: string[] = [];

    try {
        //check if its null first
        parsedTags = JSON.parse(rawTags as string);
    } catch (err) {
        return {
            errors: {
                tags: ["Invalid tags format"],
            },
        };
    }
    const result = createPostSchema.safeParse({
        title:formData.get("title"),
        content: formData.get("content"),
        tags:parsedTags,
    })

    if(!result.success){
        return {
            //flattens the Zod error into a clean object like
            errors:result.error.flatten().fieldErrors,
        }
    }

    const session = await auth();

    if(!session || !session.user){
        return {
            errors: {
                _form:["You must be signed in to do this"]
            }
        }
    }

    let post:Post;

    try {
        post = await prisma.post.create({
            data:{
                title:result.data.title,
                content: result.data.content,
                userId:session.user.id!,
                slug:SlugifyFunction(result.data.title)

            }
        })
        console.log(post.content)
    } catch(err:unknown){
        if(err instanceof Error){
            return {
                errors:{
                    _form:[err.message]
                }
            }
        } else {
            return {
                errors:{
                    _form:["Something went wrong .Failed to create Post"]
                }
            }
        }
    }


    revalidatePath("/");
    redirect(`/posts/${post.slug}`);
}