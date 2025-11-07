"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, DollarSign } from "lucide-react"
import { useRef } from "react"

const programs = [
  {
    id: 1,
    university: "Harvard University",
    country: "USA",
    program: "Computer Science",
    duration: "4 years",
    tuition: "$54,000/year",
    image: "/harvard-university-campus.webp",
    description: "World-renowned program in computer science with cutting-edge research opportunities.",
    cardClass: "card-gradient-blue",
  },
  {
    id: 2,
    university: "University of Oxford",
    country: "UK",
    program: "Business Administration",
    duration: "3 years",
    tuition: "£28,000/year",
    image: "/oxford-university-campus.webp",
    description: "Historic institution offering exceptional business education and networking opportunities.",
    cardClass: "card-gradient-purple",
  },
  {
    id: 3,
    university: "University of Toronto",
    country: "Canada",
    program: "Engineering",
    duration: "4 years",
    tuition: "CAD 58,000/year",
    image: "/toronto-university-campus.webp",
    description: "Top-ranked engineering program with strong industry connections and co-op opportunities.",
    cardClass: "card-gradient-teal",
  },
  {
    id: 4,
    university: "University of Melbourne",
    country: "Australia",
    program: "Medicine",
    duration: "6 years",
    tuition: "AUD 75,000/year",
    image: "/melbourne-university-campus.png",
    description: "Leading medical school with state-of-the-art facilities and clinical training.",
    cardClass: "card-gradient-coral",
  },
  {
    id: 5,
    university: "ETH Zurich",
    country: "Switzerland",
    program: "Data Science",
    duration: "2 years",
    tuition: "CHF 1,500/year",
    image: "/eth-zurich-campus.jpg",
    description: "Premier technical university offering advanced data science education.",
    cardClass: "card-gradient-blue",
  },
  {
    id: 6,
    university: "National University of Singapore",
    country: "Singapore",
    program: "Finance",
    duration: "3 years",
    tuition: "SGD 38,000/year",
    image: "/nus-singapore-campus.jpg",
    description: "Asia's leading university with strong focus on finance and business.",
    cardClass: "card-gradient-purple",
  },
]

const countries = ["All", "USA", "UK", "Canada", "Australia", "Switzerland", "Singapore", "Germany", "France"]

export default function ProgramsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const heroRef = useRef(null)
  const programsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const programsInView = useInView(programsRef, { once: true, margin: "-100px" })

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.country.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCountry = selectedCountry === "All" || program.country === selectedCountry

    return matchesSearch && matchesCountry
  })

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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              {t.programs.title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="text-primary">{t.programs.title.split(" ").slice(2).join(" ")}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">{t.programs.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-muted/30 sticky top-16 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.programs.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t.programs.filter} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {filteredPrograms.length} of {programs.length} programs
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section ref={programsRef} className="py-16">
        <div className="container mx-auto px-4">
          {filteredPrograms.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <p className="text-xl text-muted-foreground">No programs found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCountry("All")
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={programsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div
                    className={`h-full rounded-2xl ${program.cardClass} border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden backdrop-blur-sm`}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.university}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        {program.country}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {program.university}
                        </h3>
                        <p className="text-primary font-semibold">{program.program}</p>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>

                      <div className="space-y-2 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>{program.tuition}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-muted-foreground">
              Our expert counselors can help you discover the perfect program tailored to your goals and aspirations.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/contact">Get Personalized Guidance</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
