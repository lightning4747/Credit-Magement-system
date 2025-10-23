"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Please check your email to confirm your account. Once confirmed, you can sign in to CampusCred.
            </p>
            <Link href="/auth/login">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
