"use client"

import { createContext, useState } from "react";

type NoteProviderContextType = {
    noteText: string;
    setNoteText:(noteText: string) => void;
}

export const NoteProviderContext = createContext<NoteProviderContextType>({
    noteText: "",
    setNoteText: () => {}
});

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [noteText, setNoteText] = useState("");

    return (
        <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
            {children}
        </NoteProviderContext.Provider>
    );
};