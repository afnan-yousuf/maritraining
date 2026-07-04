'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans dark:bg-zinc-950">
      
      {/* Left Column: Form Container */}
      <div className="flex flex-col justify-center px-8 py-12 sm:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-md">
          
          {/* Logo / Branding */}
          <div className="mb-8">
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-500/20">
              L
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Please enter your details to sign in to your account.
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                  Forgot password?
                </a>
              </div>
              <div className="mt-1.5">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600 dark:text-zinc-400">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Column: Visual Panel (Hidden on Mobile) */}
      <div className="hidden lg:relative lg:block bg-zinc-900 dark:bg-zinc-900/40 border-l border-zinc-200 dark:border-zinc-850">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-black mix-blend-multiply" />
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="relative flex h-full flex-col justify-end p-16 text-white">
          <blockquote className="space-y-3">
            <p className="text-xl font-medium tracking-wide text-zinc-200">
              "Simplicity is the ultimate sophistication."
            </p>
            <footer className="text-sm font-medium text-emerald-400">
              — Enterprise Architecture Team
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}