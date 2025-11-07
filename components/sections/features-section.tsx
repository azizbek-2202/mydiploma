"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { GraduationCap, HeadphonesIcon, TrendingUp } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: GraduationCap,
    key: "universities" as const,
    cardClass: "card-gradient-blue",
  },
  {
    icon: HeadphonesIcon,
    key: "support" as const,
    cardClass: "card-gradient-purple",
  },
  {
    icon: TrendingUp,
    key: "success" as const,
    cardClass: "card-gradient-teal",
  },
]

export function FeaturesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.home.features.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div
                  className={`relative p-8 rounded-2xl ${feature.cardClass} border border-border hover:border-primary/50 transition-all duration-500 ease-out hover:shadow-2xl overflow-hidden backdrop-blur-sm ambient-glow`}
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-primary/50 transition-all duration-300 ease-out"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-all duration-300 ease-out">
                      {t.home.features[feature.key]}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.home.features[`${feature.key}Desc` as keyof typeof t.home.features]}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
