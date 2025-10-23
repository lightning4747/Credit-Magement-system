"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!fullName || !username || !department) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            email,
            full_name: fullName,
            username,
            department,
          },
        ])
        if (profileError) throw profileError
      }

      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Join CampusCred and manage your credits</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSignUp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <select
                      id="department"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business">Business</option>
                      <option value="Arts">Arts</option>
                      <option value="Science">Science</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Law">Law</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@university.edu"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign up with Google
              </Button>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
