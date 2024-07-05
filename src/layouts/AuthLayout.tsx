// import React from 'react'
import { Outlet,Navigate } from "react-router-dom"
import useTokenStore from '@/store';



const AuthLayout = () => {
     const token = useTokenStore(state=>state.token);

  if(token)
    {
return<Navigate to ={'/dashboard/home'} replace></Navigate>
   }
  return (
    <>
   <Outlet/>
    </>
  );
}

export default AuthLayout;