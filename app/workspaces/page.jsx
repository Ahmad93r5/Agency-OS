"use client";
import React from "react";
import { useEffect} from "react";
import { useRouter } from "next/navigation";


export default function Workspaces () {
   
    const router = useRouter();
    
 useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token)
    {
        router.push("/login");
    }
  
 }, [router]);

 
 

    return (
        <>
      <h1>Welcome to  Workspaces</h1>
       
        </>
    )   
}