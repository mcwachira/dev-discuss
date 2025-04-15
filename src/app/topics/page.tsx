"use client"
import { Hash, ArrowLeft, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { mockTags } from '@/data/mockData';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import { useState } from 'react';
import {useRouter} from "next/navigation";
import TopicCard from "@/components/TopicCard";



export default function TopicsPage()  {

    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter();

    const filteredTags = mockTags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const topicCategories = [
        {id:"all", name:"All"},
        {id:"popular", name:"Popular"},
        {id:"following", name:"Following"},
        {id:"recent", name:"Recently Used"},
    ]

    const [activeCategory, setActiveCategory] = useState<string>('all');

    return(
       <div className="container max-w-5xl px-4 py-6 pb-24 md:pb-6">

           <div className="flex items-center space-x-2 mb-6">
               <Button
               variant="ghost"
               size="icon"
               onClick={() =>router.back() }
               className="rounded-full"
               >
                   <ArrowLeft className="h-5 w-5"/>

               </Button>

               <h1 className="text-3xl font-bold tracking-light">
                   Topics
               </h1>
           </div>
           <div className="relative w-full mb-6">
               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
               <Input type="search" placeholder="Serch topics ..."
                      className="pl-10 py-6"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}/>
           </div>

           <div className="flex overflow-x-auto gap-2 pb-3 mb-6 no-scrollbar">
               {topicCategories.map((category) => (
                   <Button key={category.id}
                   variant={activeCategory === category.id ? "default" :"outline"}
                   onClick={() => setActiveCategory(category.id)}
                   className="whitespace-nowrap">
                       {category.name}
                   </Button>
               ))}
           </div>

           <Separator className="mb-6" />

           <div className="grid grid-cols-1 gap-4">
               {filteredTags.map((tag) => (
                   <TopicCard key={tag.id} tag={tag} />
               ))}
           </div>

           <Pagination className="mt-8">
               <PaginationContent>
                   <PaginationItem>
                       <PaginationPrevious href="#" />
                   </PaginationItem>
                   <PaginationItem>
                       <PaginationLink href="#" isActive>1</PaginationLink>
                   </PaginationItem>
                   <PaginationItem>
                       <PaginationLink href="#">2</PaginationLink>
                   </PaginationItem>
                   <PaginationItem>
                       <PaginationLink href="#">3</PaginationLink>
                   </PaginationItem>
                   <PaginationItem>
                       <PaginationNext href="#" />
                   </PaginationItem>
               </PaginationContent>
           </Pagination>
       </div>
    )
}