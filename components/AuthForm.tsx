"use client"

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { loginAction, signUpAction } from "@/actions/users";

function AuthForm({type}: {type: "login" | "signup"}) {
  const isLoginForm = type === "login";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData)=>{
    startTransition(async()=>{
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage: string | null = null;
      let title;
      let description;
      if(isLoginForm){
        const result = await loginAction(email,password);
        errorMessage = result.errorMessage;
        title = "Login successful";
        description = "You have successfully logged in";
        
        if(errorMessage && errorMessage.includes("not found")) {
          toast.error("Account not found. Please sign up first.");
          router.replace("/signup");
          return;
        }
      }else{
        errorMessage = (await signUpAction(email,password)).errorMessage;
        title = "SignUp successful, please verfiy the email to login";
        description = "You have successfully signed up, please verfiy the email to login";
      }

      if(!errorMessage){
        toast.success(`${title} ${description}`);
        router.replace("/");
      }else{
        toast.error(errorMessage);
      }
    })
  }

  return (
    <form action={handleSubmit}>
        <CardContent className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={isPending}
                />
            </div>
            <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Password</label>
                <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    disabled={isPending}
                />
            </div>
        </CardContent>
        <CardFooter className=" mt-4 flex flex-col items-center space-y-1.5">
            <Button className="w-full">
                {isPending ? <Loader2 className="animate-spin" /> : isLoginForm ? "Login" : "SignUp"}
            </Button>
            <p className="text-xs">
                {isLoginForm ? "Don't have an account yet?": "Already have an account"}{" "}
                <Link href={isLoginForm ? "/signup" : "/signin"} className={`text-blue-500 hover:underline ${isPending ? "pointer-events-none opacity-50" : ""}`}>{isLoginForm ? "SignUp" : "Login"}</Link>
            </p>
        </CardFooter>
    </form>
  )
}

export default AuthForm