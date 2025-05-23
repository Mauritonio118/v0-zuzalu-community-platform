"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { useWallet } from "@/components/wallet-provider"

export default function LoginPage() {
  const { isConnected, isWhitelisted } = useWallet()
  const router = useRouter()

  useEffect(() => {
    // If already connected, redirect to appropriate page
    if (isConnected) {
      if (isWhitelisted) {
        router.push("/dashboard")
      } else {
        router.push("/whitelist")
      }
    }
  }, [isConnected, isWhitelisted, router])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>Connect your wallet to access the Zuzalu Community Treasury</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center text-muted-foreground mb-6">
              You need to connect your wallet to apply for the whitelist or access your dashboard.
            </p>
            <ConnectWalletButton size="lg" />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
