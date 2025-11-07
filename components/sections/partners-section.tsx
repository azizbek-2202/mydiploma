"use client"

import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useRef } from "react"
import Image from "next/image"

const partners = [
  { name: "Harvard University", logo: "/harvard-university-campus.webp" },
  { name: "Oxford University", logo: "/oxford-university-campus.webp" },
  { name: "University of Toronto", logo: "/toronto-university-campus.webp" },
  { name: "University of Melbourne", logo: "/melbourne-university-campus.png" },
  { name: "ETH Zurich", logo: "/eth-zurich-campus.jpg" },
  { name: "NUS Singapore", logo: "/nus-singapore-campus.jpg" },
]

export function PartnersSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.home.partners.title}</h2>
          <p className="text-xl text-muted-foreground">{t.home.partners.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{partner.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
