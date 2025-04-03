"use client"

import { User } from "@supabase/supabase-js"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Fragment, useRef, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ArrowUpIcon } from "lucide-react"
import { askAIAboutNotesAction } from "@/actions/notes"

type Props = {
  user: User | null
}

function AskAIButton({ user }: Props) {
  console.log(user?.email)

  const router = useRouter()

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<(string | { errorMessage: string })[]>([]);

  const handleOnOpenChange = (isOpen: boolean) =>{
    if(!user){
      router.push('/signin')
    }else{
      if(isOpen){
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen)
    }
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () =>{
    const textArea = textAreaRef.current;
    if(!textArea) return;

    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`
  }

  const handleClickInput = () =>{
    textAreaRef.current?.focus();
  }

  const handleSubmit = () => {
    if(!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions)
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async()=>{
      const response = await askAIAboutNotesAction(newQuestions, responses.map(r => typeof r === 'string' ? r : r.errorMessage));
      setResponses(prev => [...prev, typeof response === 'string' ? response : response.errorMessage]);

      setTimeout(scrollToBottom, 100);
    })
  };

  const scrollToBottom = () =>{
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth"
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto" ref={contentRef}>
        <DialogHeader>
          <DialogTitle>Ask AI About Your Notes</DialogTitle>
          <DialogDescription>
            Our AI can answer questions all about your notes
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 sm:mt-4 flex flex-col gap-8">
          {questions.map((question, index)=>(
            <Fragment key={index}>
              <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                {question}
              </p>
              {responses[index] && (
                <p className="bot-response text-muted-foreground text-sm" 
                   dangerouslySetInnerHTML={{__html: typeof responses[index] === 'string' ? responses[index] : responses[index].errorMessage}}/>
              )}
            </Fragment>
          ))}
          {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
        </div>

        <div className="mt-auto flex cursor-text items-center rounded-lg border p-4 bg-background " onClick={handleClickInput}>
          <Textarea
           ref={textAreaRef} 
           placeholder="Ask me anything about your notes..."
           className="placeholder:text-muted-foreground resize-none rounded-md p-2 "
           style={{
            minHeight: "3rem",
            lineHeight: "1.5",
           }}
           rows={1}
           onInput={handleInput}
           onKeyDown={handleKeyDown}
           value={questionText}
           onChange={(e) => setQuestionText(e.target.value)}
           />
           <Button className="ml-auto mt-2 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover" onClick={handleSubmit}>
             <ArrowUpIcon className="h-4 w-4"/>
           </Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default AskAIButton