"use client"

import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { AnimatedCounter } from "@/components/animated-counter"
import { useRef } from "react"

const stats = [
  { value: 5000, suffix: "+", key: "students" as const },
  { value: 50, suffix: "+", key: "countries" as const },
  { value: 500, suffix: "+", key: "universities" as const },
  { value: 95, suffix: "%", key: "successRate" as const },
]

export function StatsSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.home.stats.title}</h2>
          <p className="text-xl text-white/80">{t.home.stats.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-lg text-white/80">{t.home.stats[stat.key]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
