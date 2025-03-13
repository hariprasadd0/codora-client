import { Card ,CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc";
import logo from './assets/codora.svg'

type Props = {}

const ForgotPassword = (props: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className=" w-11 h-11 rounded-none">
  <AvatarImage className="rounded-[10px]" src={logo} />
  <AvatarFallback>CD</AvatarFallback>
</Avatar>
<div className="flex flex-col gap-2">
        <CardTitle>Forgot Password</CardTitle>
      <CardDescription className="text-muted-foreground">Enter your email to reset your password</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
       
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input className="text-sm" id="email" placeholder="john.doe@example.com" />
            </div>
            
          </div>
        </form>
        
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 overflow-hidden">
        <Button className="w-full h-10">Send Reset Link</Button>    
        <p className="text-muted-foreground text-sm"></p>
      </CardFooter>
    </Card>
    )
  
}

export default ForgotPassword