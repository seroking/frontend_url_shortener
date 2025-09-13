"use client"
import { useState } from "react"
import "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })

  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    setError(null)
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const result = await SignUp(formData)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("unknown error occured during signup")
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="max-w-sm mx-auto border border-border rounded-lg shadow-lg bg-card w-full p-8">
        <h1 className="mb-6 text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <label htmlFor="username">Username</label> <Input type="text" name="username" onChange={(e) => {
            setFormData({ ...formData, username: e.target.value })
          }} disabled={isLoading} />
          <label htmlFor="email">Email</label> <Input type="email" name="email" onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
          }} disabled={isLoading} />
          <label htmlFor="password">Password</label> <Input type="password" name="password" onChange={(e) => {
            setFormData({ ...formData, password: e.target.value })
          }} disabled={isLoading} />
          <label htmlFor="confirmPassword">Confirm Password</label> <Input type="password" name="confirmPassword"
            onChange={(e) => { setConfirmPassword(e.target.value) }} disabled={isLoading} />
          <p>{formData.password === confirmPassword ? "" : "passwords don't match"}</p>
          <Button type="submit" className="self-center" disabled={isLoading || formData.password !== confirmPassword}>SignUp</Button>
        </form>
      </div>
    </>
  )
}
