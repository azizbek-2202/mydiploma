"use client"

import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useRef } from "react"
import { MessageSquare, Search, FileText, Plane } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    key: "step1" as const,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    key: "step2" as const,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    key: "step3" as const,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Plane,
    key: "step4" as const,
    gradient: "from-orange-500 to-red-500",
  },
]

export function ProcessSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.home.process.title}</h2>
          <p className="text-xl text-muted-foreground">{t.home.process.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold mb-3">{t.home.process[step.key]}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.home.process[`${step.key}Desc` as keyof typeof t.home.process]}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
