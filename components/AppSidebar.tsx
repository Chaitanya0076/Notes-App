import { getUser } from "@/auth/server"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
  } from "@/components/ui/sidebar"
import { prisma } from "@/prisma/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SibeBarGroupContent from "./SibeBarGroupContent";
  
  export async function AppSidebar() {
    const user = await getUser();

    let notes: Note[] = [];
    if(user){
      notes = await prisma.note.findMany({
        where:{
          authorId: user.id,
        },
        orderBy:{
          updatedAt: "desc"
        }
      })
    }
    return (
      <Sidebar>
        <SidebarContent className="custom-scrollbar">
          <SidebarGroup >
            <SidebarGroupLabel className="mb-2 mt-2 text-sm sm:text-lg">
              {user ? "Your Notes" : (<p><Link href='/signin' className="underline">Login</Link>{" "}to see your notes</p>)}
            </SidebarGroupLabel>
          </SidebarGroup>
          {user && <SibeBarGroupContent notes={notes} />}
        </SidebarContent>
      </Sidebar>
    )
  }
  