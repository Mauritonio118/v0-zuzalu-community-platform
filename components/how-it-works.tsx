import { ClipboardList, Calendar, Wallet, FileText, RefreshCw, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { howItWorksSteps } from "@/lib/mock-data"

interface StepCardProps {
  title: string
  description: string
  icon: string
  step: number
}

export function HowItWorks() {
  const getIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "ClipboardList":
        return ClipboardList
      case "Calendar":
        return Calendar
      case "Wallet":
        return Wallet
      case "FileText":
        return FileText
      case "RefreshCw":
        return RefreshCw
      default:
        return ClipboardList
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">How does it work?</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Follow these simple steps to organize your Zuzalu event and receive funding
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {howItWorksSteps.map((step, index) => {
            const Icon = getIcon(step.icon)
            return (
              <Card key={index} className="relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
