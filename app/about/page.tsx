"use client"

import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { AnimatedCounter } from "@/components/animated-counter"
import { Award, Globe, Users, Target } from "lucide-react"
import { useRef } from "react"

const values = [
  {
    icon: Target,
    titleKey: "mission" as const,
    descKey: "missionText" as const,
    cardClass: "card-gradient-blue",
  },
  {
    icon: Globe,
    titleKey: "vision" as const,
    descKey: "visionText" as const,
    cardClass: "card-gradient-purple",
  },
  {
    icon: Users,
    titleKey: "values" as const,
    descKey: "valuesText" as const,
    cardClass: "card-gradient-teal",
  },
  {
    icon: Award,
    titleKey: "team" as const,
    descKey: "teamDesc" as const,
    cardClass: "card-gradient-coral",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/professional-woman-ceo.png",
  },
  {
    name: "Michael Chen",
    role: "Head of Admissions",
    image: "/professional-man-admissions.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Student Success Director",
    image: "/professional-woman-director.png",
  },
  {
    name: "David Kim",
    role: "International Relations",
    image: "/professional-man-international.jpg",
  },
]

const stats = [
  { value: 10, suffix: "+", labelKey: "years" as const },
  { value: 5000, suffix: "+", labelKey: "students" as const },
  { value: 500, suffix: "+", labelKey: "universities" as const },
  { value: 50, suffix: "+", labelKey: "countries" as const },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const heroRef = useRef(null)
  const valuesRef = useRef(null)
  const statsRef = useRef(null)
  const teamRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 gradient-bg overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                {t.about.hero.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-primary">{t.about.hero.split(" ").slice(2).join(" ")}</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              {t.about.heroDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-lg text-muted-foreground">
                  {stat.labelKey === "years"
                    ? "Years of Experience"
                    : stat.labelKey === "students"
                      ? "Students Helped"
                      : stat.labelKey === "universities"
                        ? "University Partners"
                        : "Countries"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.titleKey}
                  initial={{ opacity: 0, y: 50 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div
                    className={`p-8 rounded-2xl ${value.cardClass} border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full backdrop-blur-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{t.about[value.titleKey]}</h3>
                        <p className="text-muted-foreground leading-relaxed">{t.about[value.descKey]}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="/students-studying-abroad-campus.jpg" alt="Our Story" className="rounded-2xl shadow-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2015, EduGlobal began with a simple mission: to make international education accessible to
                  students from all backgrounds. What started as a small consulting firm has grown into a leading
                  educational agency with partnerships across the globe.
                </p>
                <p>
                  Our founders, having experienced the challenges of studying abroad firsthand, understood the need for
                  comprehensive support and guidance. Today, we continue to innovate and expand our services to meet the
                  evolving needs of students worldwide.
                </p>
                <p>
                  With a team of experienced counselors, admission experts, and student success coordinators, we provide
                  personalized support at every step of the journey - from university selection to visa assistance and
                  beyond.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-muted-foreground">
              Let our experienced team guide you through every step of your study abroad adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started Today
              </a>
              <a
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border font-semibold hover:bg-accent transition-colors"
              >
                Explore Programs
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
