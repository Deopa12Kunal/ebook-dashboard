
import { Card ,CardContent, CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link ,useNavigate} from "react-router-dom";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import {  LoaderCircle } from "lucide-react";
import useTokenStore from "@/store";
// import { cn } from "@/lib/utils";


// import { Section } from "lucide-react";

const LoginPage = () => {
   const navigate = useNavigate();
    const setToken = useTokenStore((state)=> state.setToken);
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   // mutationFn will call react quesry
      const  mutation  = useMutation({
        mutationFn: login,
        onSuccess:(response)=>{
          // console.log("loggin successful",data);
          setToken(response.data.accessToken);
          //redirect to dasboard
          navigate('/dashboard/home');
        },
      });
    const handleLoginSubmit=()=>{
       const email = emailRef.current?.value;
       const password = passwordRef.current?.value;
           console.log('data', {email, password});
if(!email || !password){
  return alert("Please enter your email and password");
}
       // make server call we will use mutation
       mutation.mutate({email, password});
    
    };
  
  return (

   <section className="flex justify-center items-center h-screen">
     <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
        
          Enter your email below to login to your account.<br/>
            {/* this is loading state */}
          {/* {mutation.isPending && <div>Loading...</div>} */}
     {/* we can also add error is occured */}
     {mutation.isError && (
      <span className="text-red-600 text-sm">
        {"Something went wrong"}
      </span>
     )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input ref={emailRef}id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input  ref={passwordRef}id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
             
<Button onClick={handleLoginSubmit} className="w-full " disabled={mutation.isPending}>
  {
  mutation.isPending && <LoaderCircle className="animate-spin"/>
  }
  
  <span className="ml-2">Sign in
  </span>
  </Button>

         <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to={'/auth/register'} className="underline">
            Sign in
          </Link>
        </div>
        
        </div>
      </CardFooter>
  </Card>
   </section>
  

    
 );

};


export default LoginPage;