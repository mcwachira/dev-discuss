"use client"
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tag, X, Code, Image as ImageIcon, FileText, PenLine } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CodeEditor from "@/components/CodeEditor";
import {redirect} from "next/navigation";



const postSchema = z.object({

    title:z.string().min(5,{ message: "Title must be at least 5 characters long" }),
    content:z.string().min(20,{message:"Content must be at least 20 characters long" }),
})

type PostFormValues = z.infer<typeof postSchema>;
export default  function CreatePostPage(){

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [activeTab, setActiveTab] = useState('write');
    const[hasCodeSnippet, setHasCodeSnippet] = useState<boolean>(false);
    const [codeSnippet, setCodeSnippet] = useState<string>('');
    const [language, setLanguage] = useState<string>('javascript');


    const form = useForm<PostFormValues>({
resolver:zodResolver(postSchema),
        defaultValues:{
            title:"",
            content:"",
        },
    })

    const handleAddTag = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter' && tagInput.trim() !== ''){
            e.preventDefault();
            if(!tags.includes(tagInput.trim()) && tags.length <5){
                setTags([...tags, tagInput.trim()]);
                setTagInput("")
            }else if(tags.length >= 5){
                toast("You can only add upto 5 tags")
            }
        }
    }

    const handleRemoveTag = (tagToRemove:string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const onSubmit = (data: PostFormValues) => {
        // todo connect to your backend

        console.log({
            ...data,
            tags,
            codeSnippet: hasCodeSnippet ? codeSnippet : undefined,
            language: hasCodeSnippet ? language : undefined,
        });

        toast.success('Post created successfully');
        redirect('/');
    };
    return (
        <>

            <div className="flex min-h-screen">

                <main className="flex-1 container max-w-5xl px-4 py-6 pb-24 md:pb-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <PenLine className="h-6 w-6 text-devdiscuss-primary" />
                            Create a New Post
                        </h1>
                        <p className="text-muted-foreground mt-1">Share your knowledge or ask questions to the community</p>
                    </div>

                    <div className="bg-card border rounded-lg p-6">
                        <Form {...form}>
                            {/*use action*/}
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Post Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="What's your post about?"
                                                    className="text-lg"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Tags</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="py-1 px-2 flex items-center gap-1">
                                                #{tag}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => handleRemoveTag(tag)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center">
                                        <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Add up to 5 tags (press Enter to add)"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleAddTag}
                                            className="flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Tags help others discover your post
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium">Content</label>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setHasCodeSnippet(!hasCodeSnippet)}
                                                className={hasCodeSnippet ? "bg-primary text-primary-foreground" : ""}
                                            >
                                                <Code className="h-4 w-4 mr-1" />
                                                Code Snippet
                                            </Button>
                                        </div>
                                    </div>

                                    <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
                                        <TabsList className="mb-2">
                                            <TabsTrigger value="write" className="flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                Write
                                            </TabsTrigger>
                                            <TabsTrigger value="preview" className="flex items-center gap-2">
                                                <ImageIcon className="h-4 w-4" />
                                                Preview
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="write" className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Write your post content here..."
                                                                className="min-h-[200px]"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {hasCodeSnippet && (
                                                <div className="border rounded-md p-4 bg-muted/30">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-sm font-medium">Code Snippet</h3>
                                                        <select
                                                            value={language}
                                                            onChange={(e) => setLanguage(e.target.value)}
                                                            className="text-xs border rounded px-2 py-1"
                                                        >
                                                            <option value="javascript">JavaScript</option>
                                                            <option value="typescript">TypeScript</option>
                                                            <option value="html">HTML</option>
                                                            <option value="css">CSS</option>
                                                            <option value="python">Python</option>
                                                            <option value="java">Java</option>
                                                        </select>
                                                    </div>
                                                    <CodeEditor
                                                        code={codeSnippet}
                                                        language={language}
                                                        onChange={setCodeSnippet}
                                                    />
                                                </div>
                                            )}
                                        </TabsContent>

                                        <TabsContent value="preview">
                                            <div className="border rounded-md p-4 min-h-[200px] prose dark:prose-invert max-w-none">
                                                {form.watch('content') ? (
                                                    <div>
                                                        <h2 className="text-xl font-bold">{form.watch('title') || 'Post Title'}</h2>
                                                        <div className="mt-2 whitespace-pre-wrap">{form.watch('content')}</div>

                                                        {hasCodeSnippet && codeSnippet && (
                                                            <div className="mt-4 bg-muted rounded-md p-4 overflow-x-auto">
                                <pre className="text-sm">
                                  <code>{codeSnippet}</code>
                                </pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-muted-foreground">Your post preview will appear here</p>
                                                )}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => navigate('/')}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Publish Post</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </main>
                {/*<RightSidebar />*/}
            </div>

        </>
    );
};

