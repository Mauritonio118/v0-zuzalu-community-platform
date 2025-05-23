"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/components/wallet-provider"
import { WithdrawalModal } from "@/components/withdrawal-modal"
import { EventReportForm } from "@/components/event-report-form"
import { useToast } from "@/hooks/use-toast"
import { CalendarDays, Users, ArrowRight } from "lucide-react"
import { pastEventsData } from "@/lib/mock-data"

export default function DashboardPage() {
  const { isConnected, isWhitelisted, address, balance, updateBalance } = useWallet()
  const router = useRouter()
  const { toast } = useToast()

  const [withdrawalOpen, setWithdrawalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("petty-cash")

  useEffect(() => {
    // Only redirect if not connected - allow access regardless of whitelist status
    if (!isConnected) {
      router.push("/login")
    }
  }, [isConnected, router])

  const handleWithdraw = async (amount: number): Promise<boolean> => {
    try {
      // Simulate wallet interaction
      if (typeof window !== "undefined" && window.ethereum) {
        // Request signature to verify ownership
        const message = `I am withdrawing $${amount.toFixed(2)} from my Zuzalu Treasury petty cash`
        await window.ethereum.request({
          method: "personal_sign",
          params: [message, address],
        })

        // Simulate API call to process withdrawal
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Update the balance after successful withdrawal
        const newBalance = balance - amount
        updateBalance(newBalance)

        return true
      } else {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to withdraw funds.",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Withdrawal error:", error)
      return false
    }
  }

  // If not connected or loading whitelist status, show loading
  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  // Get the 3 most recent events for the dashboard preview
  const recentEvents = [...pastEventsData]
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your petty cash and submit event reports</p>
            </div>

            <Card className="w-full md:w-auto">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Petty Cash Balance</p>
                    <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
                  </div>
                  <Button onClick={() => setWithdrawalOpen(true)} disabled={balance <= 0}>
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="petty-cash">Petty Cash</TabsTrigger>
              <TabsTrigger value="event-report">Event Report</TabsTrigger>
              <TabsTrigger value="past-events">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="petty-cash" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Petty Cash</CardTitle>
                  <CardDescription>View your balance and transaction history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Available Balance</h3>
                      <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        This is a simulated balance for demonstration purposes.
                      </p>
                      <Button className="w-full mt-4" onClick={() => setWithdrawalOpen(true)} disabled={balance <= 0}>
                        {balance <= 0 ? "No funds available" : "Withdraw Funds"}
                      </Button>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Recent Transactions</h3>
                      <div className="rounded-lg border">
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Initial Allocation</p>
                              <p className="text-sm text-muted-foreground">May 20, 2025</p>
                            </div>
                            <p className="text-green-500 font-medium">+$300.00</p>
                          </div>
                        </div>
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          No other transactions to display
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="event-report" className="mt-6">
              <EventReportForm />
            </TabsContent>

            <TabsContent value="past-events" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Recent Community Events</h3>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/past-events">
                      View All Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {recentEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees} attendees
                          </div>
                          <p className="line-clamp-2 mt-2">{event.description}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="ghost" size="sm" className="w-full">
                          <Link href={`/past-events#event-${event.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      <WithdrawalModal
        open={withdrawalOpen}
        onOpenChange={setWithdrawalOpen}
        balance={balance}
        onWithdraw={handleWithdraw}
      />
    </div>
  )
}
