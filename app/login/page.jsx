"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Login() {

const router = useRouter();  // Initialize the router for navigation
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");



function handleSubmit(e) {
  e.preventDefault();   
   fetch("http://localhost:3001/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      email,
      password,
    },
  }),
})
.then((response) => response.json())
.then((data) => {
localStorage.setItem("token", data.token);
  console.log("LOGIN SUCCESS");
router.push("/dashboard");
})
.catch((error) => {
  console.error("Error:", error);
});

}



 return (
 <>
   <h1>Login</h1>
   <form  onSubmit={handleSubmit}>
     <label htmlFor="email">Email</label>
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required />
     <label htmlFor="password">Password</label>
     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />
     <button type="submit">Login</button>
      <p>
        Dont have an account? <Link href="/signup">Signup</Link>
      </p>   
   </form>
 </>
  
  );
}