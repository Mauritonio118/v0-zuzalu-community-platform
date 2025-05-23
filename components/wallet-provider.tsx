"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type WalletContextType = {
  address: string | null
  isConnected: boolean
  isWhitelisted: boolean | null
  balance: number
  connect: () => Promise<string | null>
  disconnect: () => void
  checkWhitelistStatus: () => Promise<boolean>
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isWhitelisted: null,
  balance: 0,
  connect: async () => null,
  disconnect: () => {},
  checkWhitelistStatus: async () => false,
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null)
  const [balance, setBalance] = useState(300) // Simulated balance

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      setIsConnected(true)
      checkWhitelistStatus()
    }
  }, [])

  const connect = async (): Promise<string | null> => {
    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]

        // Request signature to verify ownership (optional)
        const message = "Sign this message to connect to Zuzalu Treasury"
        await window.ethereum.request({
          method: "personal_sign",
          params: [message, account],
        })

        setAddress(account)
        setIsConnected(true)
        localStorage.setItem("walletAddress", account)

        // Check whitelist status after connecting
        await checkWhitelistStatus()

        return account
      } else {
        alert("Please install MetaMask to use this feature")
        return null
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      return null
    }
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    setIsWhitelisted(null)
    localStorage.removeItem("walletAddress")
  }

  const checkWhitelistStatus = async (): Promise<boolean> => {
    // Simulate API call to check whitelist status
    // In a real app, this would be a call to your backend or smart contract
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, randomly determine whitelist status
        // In production, this would be a real check against your database
        const status = localStorage.getItem("isWhitelisted") === "true"
        setIsWhitelisted(status)
        resolve(status)
      }, 500)
    })
  }

  const value = {
    address,
    isConnected,
    isWhitelisted,
    balance,
    connect,
    disconnect,
    checkWhitelistStatus,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

// Add TypeScript interface for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}
