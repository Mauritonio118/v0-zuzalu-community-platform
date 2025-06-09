"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { treasuryData } from "@/lib/mock-data"

export function TreasuryStats() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Principal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatCurrency(treasuryData.principal)}</div>
          <p className="text-xs text-muted-foreground">Total locked funds</p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Accumulated Yields</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatCurrency(treasuryData.accumulatedYields)}</div>
          <p className="text-xs text-muted-foreground">Available for distribution</p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatCurrency(treasuryData.expenses)}</div>
          <p className="text-xs text-muted-foreground">Last 6 months</p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Next Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{treasuryData.nextDistribution}</div>
          <p className="text-xs text-muted-foreground">Mark your calendar</p>
        </CardContent>
      </Card>
    </div>
  )
}
