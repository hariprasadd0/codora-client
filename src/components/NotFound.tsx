import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {ArrowLeft } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className=' flex justify-center items-center h-screen'>
      <h1 className="select-none text-[14rem] opacity-[5%] filter transition duration-200 sm:text-[18rem] lg:text-[24rem] blur-sm">404</h1>
      <div className='absolute flex flex-col justify-center items-center gap-7'>
        <div className="flex flex-col items-center justify-center space-y-6 transition opacity-100">
          <div className=" flex w-[320px] flex-col items-center justify-center space-y-3">
            <h1 className="m-2 text-2xl">Project Not Found 📋</h1>
            <p className="text-center text-sm text-muted-foreground">The task or project you're looking for seems to be missing from our boards!</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigate('/dashboard')}
            variant="default"
              className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center"
            >
              <ArrowLeft className="w-4 h-4 " />
              <span className="truncate">Return to Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound