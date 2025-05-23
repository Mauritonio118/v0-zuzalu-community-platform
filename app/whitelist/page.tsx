"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function WhitelistPage() {
  const { isConnected, isWhitelisted } = useWallet()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    socialMedia: "",
    introduction: "",
    zuzaluExperience: "",
    activities: "",
    previousExperience: "",
    acceptTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "You must accept the terms to submit your application.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to submit whitelist application
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll store the whitelist status in localStorage
      localStorage.setItem("isWhitelisted", "true")

      setIsSubmitted(true)

      toast({
        title: "Application submitted",
        description: "Your whitelist application has been submitted successfully.",
      })

      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">Apply to the Whitelist</h1>

          {!isConnected ? (
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>You need to connect your wallet before applying to the whitelist.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ConnectWalletButton size="lg" />
              </CardContent>
            </Card>
          ) : isSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Application Submitted</CardTitle>
                <CardDescription>Thank you for applying to the Zuzalu Community Treasury whitelist.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p>Your application has been received and will be reviewed soon.</p>
                  <p>You will be redirected to your dashboard in a moment...</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Whitelist Application</CardTitle>
                <CardDescription>
                  Fill out this form to apply for the Zuzalu Community Treasury whitelist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="socialMedia">Telegram / Discord / Twitter / Personal website</Label>
                      <Input
                        id="socialMedia"
                        name="socialMedia"
                        value={formData.socialMedia}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="introduction">Personal Introduction</Label>
                      <Textarea
                        id="introduction"
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="zuzaluExperience">How did you get into Zuzalu?</Label>
                      <Textarea
                        id="zuzaluExperience"
                        name="zuzaluExperience"
                        value={formData.zuzaluExperience}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="activities">What kind of activities would you like to organize?</Label>
                      <Textarea
                        id="activities"
                        name="activities"
                        value={formData.activities}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="previousExperience">Do you have previous experience organizing events?</Label>
                      <Textarea
                        id="previousExperience"
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={handleCheckboxChange}
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        I accept the terms and conditions
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
