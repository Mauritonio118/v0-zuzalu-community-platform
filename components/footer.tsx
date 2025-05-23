import Link from "next/link"
import { Twitter, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Zuzalu Treasury</h3>
          <p className="text-sm text-muted-foreground">
            Funding Zuzalu gatherings around the world with decentralized yields.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/whitelist" className="text-muted-foreground hover:text-foreground transition-colors">
                Apply to Whitelist
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Connect</h3>
          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:info@zuzalu.org"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t border-border/40">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Zuzalu Community Treasury. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
