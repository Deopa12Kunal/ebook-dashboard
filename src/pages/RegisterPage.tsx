// import React from 'react'
import { Card ,CardContent, CardDescription,CardHeader,CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link,useNavigate } from "react-router-dom";
import { useRef } from "react";
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import {  LoaderCircle } from "lucide-react";
import useTokenStore from "@/store";


// import { login } from "@/http/api";



const RegisterPage = () => {
  
      const navigate = useNavigate();
          const setToken = useTokenStore((state)=> state.setToken);

       const nameRef = useRef<HTMLInputElement>(null);
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   // mutationFn will call react quesry
      const  mutation  = useMutation({
        mutationFn: register,
        onSuccess:(response)=>{
                    setToken(response.data.accessToken);

          console.log("loggin successful");
          //redirect to dasboard
          navigate('/dashboard/home');
        },
      });  
    const handleRegisterSubmit=()=>{
             const name = nameRef.current?.value;

       const email = emailRef.current?.value;
       const password = passwordRef.current?.value;
           console.log('data', {email, password});
if(!name || !email || !password){
  return alert("Please enter your email and password");
}
       // make server call we will use mutation
       mutation.mutate({name,email, password});
    
    };
     return (
    <section className="flex justify-center items-center h-screen">
        <Card   className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
         {mutation.isError && (
      <span className="text-red-600 text-sm">
        {"Something went wrong"}
      </span>
     )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid  gap-4">
           <Label htmlFor="first-name">Name</Label>
              <Input ref ={nameRef} id="first-name" placeholder="Max" required />
           
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input  ref={passwordRef} id="password" type="password" />
          </div>
          <Button onClick={handleRegisterSubmit} className="w-full " disabled={mutation.isPending}>
  {
  mutation.isPending && <LoaderCircle className="animate-spin"/>
  }
  
  <span className="ml-2">Create an account
  </span>
  </Button>
          {/* <Button onClick={handleRegisterSubmit} type="submit" className="w-full">
            Create an account
          </Button> */}
          {/* <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={'/auth/login'} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </section>
  );
}

export default RegisterPage