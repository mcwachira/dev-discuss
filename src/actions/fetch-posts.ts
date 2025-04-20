"use server"


import {fetchAllPosts, fetchMostCommented, fetchPopularPosts, fetchPostByMostViewed} from "@/db/queries/post";

export async function  getSortedPosts  (sortBy?:string){



//popular  posts have  upvotes of more than 25

    switch (sortBy) {
        case 'popular':
            return fetchPopularPosts()
        case 'comments':
            return fetchMostCommented()
        case 'views':
            return fetchPostByMostViewed()
        case 'newest':
        default:
            return fetchAllPosts()
    }
};