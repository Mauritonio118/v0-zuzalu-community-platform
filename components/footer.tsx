import Link from "next/link"
import { Twitter, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold">ZuFood</h3>
          <p className="text-sm text-muted-foreground">Fueling the Zuitzerland community with food.</p>
        </div>

        <div className="space-y-4 flex flex-col items-center md:items-center text-center">
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

        <div className="space-y-4 flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-lg font-semibold">Connect</h3>
          <div className="flex space-x-4">
            <Link
              href="https://x.com/zuitzerland"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/Mauritonio118/v0-zuzalu-community-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ZuFood. All rights reserved.</p>
      </div>
    </footer>
  )
}
