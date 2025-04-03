import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/ModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();
  return (
    <header className="relative flex items-center justify-between w-full px-2 h-18 mx-auto sm:px-4 lg:px-8 bg-popover border-b-2">
      <SidebarTrigger />
        <Link href="/" className="flex items-end gap-2">
            <Image src="/file.svg" alt='logo' width={30} height={30} />
            <h1 className="font-semibold text-2xl">Notes</h1>
        </Link>

        <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/signup" className="hidden sm:block cursor-pointer">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline"> 
              <Link href="/signin" className="cursor-pointer">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header