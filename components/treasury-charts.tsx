"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { monthlyHistoryData, fundDistributionData, treasuryTimelineData } from "@/lib/mock-data"

export function TreasuryCharts() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
  }

  // Custom tooltip for the timeline chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(Math.abs(entry.value))}
              {entry.dataKey === "periodExpenses" && entry.value < 0 ? " (expense)" : ""}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Tabs defaultValue="timeline" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="timeline">Treasury Timeline</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Activity</TabsTrigger>
        <TabsTrigger value="distribution">Fund Distribution</TabsTrigger>
      </TabsList>

      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>Treasury Evolution Over Time</CardTitle>
            <CardDescription>Track the principal, total funds, returns, and expenses over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={treasuryTimelineData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} domain={["dataMin - 50000", "dataMax + 50000"]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Principal line - stepped/discrete increases */}
                <Line
                  type="stepAfter"
                  dataKey="principal"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Principal"
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                />

                {/* Total funds line - always above principal */}
                <Line
                  type="monotone"
                  dataKey="totalFunds"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="Total Funds"
                  dot={{ fill: "#06b6d4", strokeWidth: 2, r: 3 }}
                />

                {/* Period returns - positive values */}
                <Line
                  type="monotone"
                  dataKey="periodReturns"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Period Returns"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                />

                {/* Period expenses - negative values */}
                <Line
                  type="monotone"
                  dataKey="periodExpenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Period Expenses"
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Treasury Activity</CardTitle>
            <CardDescription>View the principal, yield, and expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyHistoryData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="yield" name="Yield" fill="#8884d8" />
                <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="distribution">
        <Card>
          <CardHeader>
            <CardTitle>Fund Distribution</CardTitle>
            <CardDescription>How funds are allocated across different types of activities</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fundDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
