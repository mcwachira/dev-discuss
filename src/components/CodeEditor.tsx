"use client"

import {useEffect, useRef} from "react";

interface CodeEditorProps {
    code: string;
    language: string;
    onChange: (code: string) => void;
}
const CodeEditor = ({code , language , onChange}:CodeEditorProps) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if(!textarea) return;

        const handleKeyDown = (e:KeyboardEvent) => {
            // Handle tab key to insert spaces instead of changing focus
            if(e.key === 'Tab'){
                e.preventDefault()

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                // Insert 2 spaces at cursor position
                const newValue = code.substring(0, start) + '  ' + code.substring(end);
                onChange(newValue);

                // Move cursor position after the inserted tab
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 2;
                }, 0);
            }
        };

        textarea.addEventListener('keydown', handleKeyDown);
        return () => textarea.removeEventListener('keydown', handleKeyDown);
    }, [code, onChange]);
    return (
        <div className="w-full relative">
      <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full font-mono text-sm p-2 rounded-md bg-card border resize-y min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={`// Enter your ${language} code here`}
          spellCheck="false"
      />
            <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                {language}
            </div>
        </div>
    )
}

export default CodeEditor;