"use client"

import { useState } from "react"
import "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const result = await SignIn(formData)
    }
    catch (err) {
      if (err instanceof Error)
        setError(err.message)
      else
        setError("unknown error occured during the login")
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <div className="max-w-sm mx-auto border border-border rounded-lg shadow-lg bg-card p-8 w-full">
      <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email" className="">Username</label> <Input type="email" name="email" onChange={(e) => {
          setFormData({ ...formData, email: e.target.value })
        }} disabled={isLoading} />
        <label htmlFor="password">Password</label><Input type="password" name="password" onChange={(e) => {
          setFormData({ ...formData, password: e.target.value })
        }} disabled={isLoading} />

        <Button type="submit" className="self-center" disabled={isLoading}>{isLoading ? "Signing In..." : "Sign In"}</Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
