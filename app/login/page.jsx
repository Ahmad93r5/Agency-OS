"use client";
// import Link from "next/link";
import LoginForm from "@/components/Auth/LoginForm";
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
.then((response) => {
   if (!response.ok) {
    throw new Error("Login Failed")
   }
     return response.json();
  })
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
   <LoginForm
     email={email}
     setEmail={setEmail}
     password={password}
     setPassword={setPassword}
     handleSubmit={handleSubmit}

   />

 )
}