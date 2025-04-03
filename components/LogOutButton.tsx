"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/actions/users"

function LogOutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async() => {
    setLoading(true)

    const { errorMessage } = await logoutAction();

    if (!errorMessage) {
      setLoading(false)
      toast.success("Logout successful")
      router.push("/")
    }else{
        setLoading(false)
        toast.error(errorMessage)
    }
    setLoading(false)
  }
  return (
    <Button variant="outline" className="w-20" onClick={handleLogout}> 
        {loading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  )
}

export default LogOutButton