"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
 const router = useRouter();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


 function handleSubmit(e) {
  e.preventDefault();   
 //    console.log("Signup form submitted with:", { name, email, password });
      fetch("http://localhost:3001/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
        user: {
            name,
            email,
            password,
        },
    }), 
 })
 .then(response => response.json())
 .then(data => {
   console.log("Signup successful:", data);
   router.push("/login");  
 });

 }

  return (
   <>
      <h1>Signup</h1>
     <form onSubmit={handleSubmit}>
           < label htmlFor="name">name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" required />
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />
            <button type="submit">Signup</button>      
     </form>
     
     <div >
                         <button><Link href="/login">Login</Link></button> 
        </div>  


     
    </>
  );
}