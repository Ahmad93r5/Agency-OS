"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function Dashboard() {

const router = useRouter();  

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, [router]); //“React, is useEffect ke andar router use ho raha hai. Agar router ki value change ho, to effect dobara chala dena.”

// for logout functionality & remove token from local storage
function handleLogout() {
  localStorage.removeItem("token");
  router.push("/login");
}


  return (
    <>
     <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
    
    <div>
         <button onClick={handleLogout}>Logout</button>
    </div>
    </>
   
  );
}