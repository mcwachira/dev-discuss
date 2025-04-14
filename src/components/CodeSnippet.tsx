"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Check, Copy} from "lucide-react";

interface CodeSnippetProps {
    code: string;
    language: string;
}

const CodeSnippet = ({code, language}: CodeSnippetProps) => {

    const [copied, setCopied] = useState(false);


    //use async await
    const copyToClipboard = () => {

        try{
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000)
        });
        }catch(err){
            console.log("failed to copy text from clipboard", err)

        }
    }

    return (

        <div className="relative bg-muted/30 rounded-md oveflow-hidden border mt-4 mb-4">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
                <span className="text-xs font-medium">
                    {language}
                </span>

                 <Button variant="ghost"
                         size="sm"
                         onClick={copyToClipboard}
                         className="h-8 w-8 p-0">
                     {copied ? <Check className="h-4 2-4"/> : <Copy className="h-4 w-4"/>}
                 </Button>
            </div>

            <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono">
                    {code}
                </code>
            </pre>
        </div>
    )
}