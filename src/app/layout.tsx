import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Shannu — Cybersecurity Engineer & AI Builder",
  description:
    "Shannu is a cybersecurity engineer, AI builder and CTF player from India building intelligent systems that find, understand and fix vulnerabilities automatically.",
  keywords: [
    "cybersecurity",
    "security engineer",
    "AI security",
    "penetration testing",
    "CTF",
    "reverse engineering",
    "Shannu",
    "5h4nnu-dev",
  ],
  authors: [{ name: "Shannu" }],
  openGraph: {
    title: "Shannu — Cybersecurity Engineer & AI Builder",
    description: "Hack to understand. Build to protect.",
    type: "website",
    locale: "en_IN",
    siteName: "Shannu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shannu — Cybersecurity Engineer & AI Builder",
    description: "Hack to understand. Build to protect.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.skill-bar i{transform:scaleX(1) !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
