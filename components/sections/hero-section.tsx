"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
// import { EarthGlobe } from "@/components/3d/earth-globe"
import { FloatingGlobe } from "@/components/3d/floating-globe"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-gradient"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.home.hero.badge}</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              <span className="text-foreground">{t.home.hero.title.split(" ").slice(0, 3).join(" ")}</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t.home.hero.title.split(" ").slice(3).join(" ")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
              {t.home.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md group"
              >
                <Link href="/contact">
                  {t.home.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
              >
                <Link href="/programs">{t.home.hero.explore}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[500px] lg:h-[600px]"
          >
            <FloatingGlobe />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-1.5 bg-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
