"use client"

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { createNoteAction } from "@/actions/notes"

type Props = {
    user: User | null
}

function NewNoteButton({ user }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClickNewNoteButton = async () => {
        if (!user) {
            router.push('/signin');
        } else {
            setLoading(true)

            const uuid = uuidv4();
            await createNoteAction(uuid)
            router.push(`/?noteId=${uuid}`)

            toast.success("New Note Created");

            setLoading(false);
        }
    }

    return (
        <Button onClick={handleClickNewNoteButton} variant="secondary" className="w-24" disabled={loading}>
            {loading ? <Loader2 className="animate-spin"/> : "New Note"}
        </Button>
    )
}

export default NewNoteButton