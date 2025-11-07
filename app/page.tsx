"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ProcessSection } from "@/components/sections/process-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { CTASection } from "@/components/sections/cta-section"
import { WelcomeAnimation } from "@/components/welcome-animation"

export default function HomePage() {
  return (
    <>
      <WelcomeAnimation />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <ProcessSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
