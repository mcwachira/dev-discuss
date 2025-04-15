"use client"
import { Hash, ArrowLeft, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { mockUsers} from '@/data/mockData';
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
import ContributorCard from "@/components/ContributorCard";



    export default function ContributorsPage() {

    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter();

    const filteredUsers = mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const topicCategories = [
        {id:"all", name:"All"},
        {id:"top", name:"Top Contributors"},
        {id:"following", name:"Following"},
        {id:"new", name:"New Members"},
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
                  Contributors
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
                {filteredUsers.map((user) => (
                    <ContributorCard key={user.id} user={user} />
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