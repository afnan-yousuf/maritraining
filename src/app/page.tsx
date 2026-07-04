'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }


  const handleLogin = async (e: React.FormEvent) =>{

    e.preventDefault();

    const response = await fetch("/api/auth/login",{
      method: "POST",
      headers:{
        'Content-Type': "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if(result.success){
      router.push("/dashboard")
    }
    else{
      alert(result.message)
    }


  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        Email:  <input type="email" name="email" placeholder="example@gmail.com" required value={formData.email} onChange={handleChange} />
        assword:  <input type="password" name="password" required value={formData.password} onChange={handleChange} />
        <button className="btn-lg bg-green-400 p-2">Login</button>
      </form>

    </div>
  );
}
