import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { TreasuryStats } from "@/components/treasury-stats"
import { TreasuryCharts } from "@/components/treasury-charts"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
                Campus On Chain
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10">Fueling university communities FOREVER</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="/whitelist">Apply to Whitelist</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link href="/login">Connect Wallet</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Treasury Status Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center text-primary">
              Community Treasury Status
            </h2>
            <TreasuryStats />
            <div className="mt-8">
              <TreasuryCharts />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      <Footer />
    </div>
  )
}
