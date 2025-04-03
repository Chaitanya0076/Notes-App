import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SignUp = () =>{
  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
        <Card className="w-full max-w-sm">
            <CardHeader className="mb-4">
                <CardTitle className="text-center text-3xl">SignUp</CardTitle>
            </CardHeader>

            <AuthForm type="signup" />
        </Card>
    </div>
  )
}

export default SignUp