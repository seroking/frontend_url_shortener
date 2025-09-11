"use client"
import { useState } from "react"
import "@/lib/auth"
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label> <input type="text" name="username" onChange={(e) => {
          setFormData({ ...formData, username: e.target.value })
        }} disabled={isLoading} />
        <label htmlFor="email">Email</label> <input type="email" name="email" onChange={(e) => {
          setFormData({ ...formData, email: e.target.value })
        }} disabled={isLoading} />
        <label htmlFor="password">Password</label> <input type="password" name="password" onChange={(e) => {
          setFormData({ ...formData, password: e.target.value })
        }} disabled={isLoading} />
        <label htmlFor="confirmPassword">Confirm Password</label> <input type="password" name="confirmPassword"
          onChange={(e) => { setConfirmPassword(e.target.value) }} disabled={isLoading} />
        <p>{formData.password === confirmPassword ? "" : "passwords don't match"}</p>
        <button type="submit" disabled={isLoading || formData.password !== confirmPassword}>SignUp</button>
      </form>
    </>
  )
}
