"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ProgramsGrid } from "@/components/ProgramsGrid"
import { SearchFilter } from "@/components/SearchFilter"
import { fetchPrograms, Program } from "@/lib/api-programs"

const countries = ["All", "USA", "UK", "Canada", "Australia", "Switzerland", "Singapore", "Germany", "France"]

export default function ProgramsPage() {
  const { t, locale } = useLanguage()

  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All")

  const [visibleCount, setVisibleCount] = useState(6) // dastlab ko'rinadigan cardlar soni

  const heroRef = useRef(null)
  const programsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const programsInView = useInView(programsRef, { once: true, margin: "-100px" })

  // Backenddan ma’lumot olish
  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await fetchPrograms(locale)
        setPrograms(data)
      } catch (err) {
        setError("Failed to load programs")
      } finally {
        setLoading(false)
      }
    }
    loadPrograms()
  }, [locale])

  // Filterlangan programs
  const filteredPrograms = programs
    .map((program) => {
      const translation = program.translations.find((tr) => tr.language === locale)
      return {
        ...program,
        translation,
      }
    })
    .filter((program) => {
      if (!program.translation) return false

      const { nomi, davlat, yonalishi } = program.translation

      const matchesSearch =
        nomi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        yonalishi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        davlat.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCountry = selectedCountry === "All" || davlat === selectedCountry

      return matchesSearch && matchesCountry
    })

  // Ko'rinadigan cardlar
  const visiblePrograms = filteredPrograms.slice(0, visibleCount)

  // Load more tugmasi
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

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

      {/* Search & Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
        totalPrograms={programs.length}
        filteredProgramsCount={filteredPrograms.length}
        t={t}
      />

      {/* Programs Grid with loading/error */}
      <div ref={programsRef} className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center mt-20">Loading programs...</p>
        ) : error ? (
          <p className="text-center mt-20 text-red-500">{error}</p>
        ) : filteredPrograms.length === 0 ? (
          <p className="text-center mt-20">No programs found.</p>
        ) : (
          <>
            <ProgramsGrid
              programs={visiblePrograms} // faqat visiblePrograms ko‘rsatamiz
              programsInView={programsInView}
              clearFilters={() => {
                setSearchQuery("")
                setSelectedCountry("All")
                setVisibleCount(6) // filter clear qilinganda dastlabki 6 ta card
              }}
            />

            {/* Load More tugmasi */}
            {visibleCount < filteredPrograms.length && (
              <div className="text-center mt-8">
                <Button onClick={handleLoadMore} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>

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
