import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostFilterProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  timeFrame: string;
  setTimeFrame: (value: string) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const PostFilter = ({
  sortBy,
  setSortBy,
  timeFrame,
  setTimeFrame,
  activeTab,
  setActiveTab,
}: PostFilterProps) => {
  return (
<div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
    <TabsList>
      <TabsTrigger value="all">All Posts</TabsTrigger>
      <TabsTrigger value="popular">Popular</TabsTrigger>
      <TabsTrigger value="latest">Latest</TabsTrigger>

    </TabsList>
  </Tabs>

  <div className="flex items-center space-x-2 w-full sm:w-auto justify-start">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <SlidersHorizontal className="h-4 w-4 mr-2" />

          Filter & Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">Most Upvoted</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="comments">Most Comments</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="views">Most Viewed</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Time Frame</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={timeFrame} onValueChange={setTimeFrame}>
          <DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="week">This Week</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="month">This Month</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="year">This Year</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="all">All Time</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

</div>

  )
};


export default PostFilter
