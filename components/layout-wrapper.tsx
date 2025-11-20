"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedBackground } from "@/components/3d/enhanced-background"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hideLayout = pathname ==="/mydiploma/"

    return (
        <div className="relative">
            <EnhancedBackground />
            {!hideLayout && <Header />}
            <main className="min-h-screen pt-16 relative z-10">{children}</main>
            {!hideLayout && <Footer />}
        </div>
    )
}
