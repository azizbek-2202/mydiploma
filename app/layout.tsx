import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedBackground } from "@/components/3d/enhanced-background"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "EduGlobal - Study Abroad Agency",
  description: "Your gateway to global education. Discover world-class universities and transform your future.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <div className="relative">
              <EnhancedBackground />
              <Header />
              <main className="min-h-screen pt-16 relative z-10">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
