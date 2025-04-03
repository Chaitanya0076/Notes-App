"use client"

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
// import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type props = {
    noteId: string;
    startingNoteText: string;
}

let updateTimeOut:NodeJS.Timeout;

function NoteTextInput({noteId, startingNoteText}: props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const {noteText, setNoteText} = useNote();

  useEffect(()=>{
    if(noteIdParam === noteId){
        setNoteText(startingNoteText);
    }
  },[startingNoteText, noteIdParam, noteId, setNoteText])

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) =>{
    const text = e.target.value;

    setNoteText(text);

    clearTimeout(updateTimeOut);
    updateTimeOut = setTimeout(()=>{
        updateNoteAction(noteId, text);
    }, 2000);
  }
  return (
    <Textarea 
        value={noteText}
        onChange={handleUpdateNote}
        placeholder="Type your note here..."
        className="custom-scrollbar placeholder:text-muted-foreground mb-4 h-full w-full resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  )
}

export default NoteTextInput