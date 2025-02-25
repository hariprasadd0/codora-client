import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc";
import logo from './assets/codora.svg'


export const Login = () => {
    return (
        <section className="flex flex-col items-center justify-center w-full h-screen">
                <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className=" w-11 h-11 rounded-none">
  <AvatarImage className="rounded-[10px]" src={logo} />
  <AvatarFallback>CD</AvatarFallback>
</Avatar>
<div className="flex flex-col gap-2">
        <CardTitle>Sign In</CardTitle>
      <CardDescription className="text-muted-foreground">Enter your credentials to login</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
       
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input className="text-sm" id="email" placeholder="john.doe@example.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input className="text-sm" id="password" placeholder="Enter your password" type="password" />
              <span className="flex items-center justify-end p-0"><p className="text-muted-foreground text-sm">Forgot password?</p></span>
            </div>  
          </div>
        </form>
        
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 overflow-hidden">
        <Button className="w-full h-10">Login</Button>
        <span className="w-full flex items-center gap-2 justify-center"><Separator />or<Separator/></span>
        <Button className="w-full h-10 text-muted-foreground display-flex items-center justify-center gap-2" variant="outline"><FcGoogle style={{ width: "20px", height: "20px" }} /> Login with Google</Button>
        <p className="text-muted-foreground text-sm">Don't have an account? <a className="underline" href="/signup">Sign Up</a></p>
      </CardFooter>
    </Card>
        </section>
    
    )
}