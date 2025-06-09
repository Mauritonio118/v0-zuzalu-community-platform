"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"

interface ConnectWalletButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
}

export function ConnectWalletButton({
  variant = "default",
  size = "default",
  className = "",
  onClick,
}: ConnectWalletButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const { connect, isWhitelisted } = useWallet()
  const router = useRouter()
  const { toast } = useToast()

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const address = await connect()

      if (address) {
        toast({
          title: "Wallet connected",
          description: "Your wallet has been connected successfully.",
        })

        // Check if user is whitelisted and redirect accordingly
        if (isWhitelisted) {
          router.push("/dashboard")
        } else {
          router.push("/whitelist")
        }

        if (onClick) onClick()
      }
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection failed",
        description: "There was an error connecting your wallet.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${variant === "default" ? "text-white" : variant === "outline" ? "border-primary text-primary hover:bg-primary hover:text-white" : ""}`}
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
