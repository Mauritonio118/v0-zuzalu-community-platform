"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import Image from "next/image"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected, address, disconnect } = useWallet()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/campus-on-chain-logo.jpg"
              alt="Campus On Chain"
              width={180}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="block md:hidden text-primary" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          {isConnected && (
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/whitelist"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/whitelist" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Apply
          </Link>

          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{formatAddress(address || "")}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={disconnect}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 bg-background border-b border-border md:hidden">
            <nav className="container flex flex-col py-4 gap-2">
              <Link
                href="/"
                className={`p-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {isConnected && (
                <Link
                  href="/dashboard"
                  className={`p-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/whitelist"
                className={`p-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/whitelist" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Apply
              </Link>

              {isConnected ? (
                <div className="flex flex-col gap-2 p-2">
                  <span className="text-sm text-muted-foreground">{formatAddress(address || "")}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      disconnect()
                      setIsMenuOpen(false)
                    }}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="p-2">
                  <ConnectWalletButton onClick={() => setIsMenuOpen(false)} />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
