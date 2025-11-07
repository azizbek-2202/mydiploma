"use client"

import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useRef } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    nameRu: "Сара Джонсон",
    nameUz: "Sara Jonson",
    university: "Harvard University",
    universityRu: "Гарвардский университет",
    universityUz: "Garvard universiteti",
    text: "MyDiploma made my dream of studying at Harvard a reality. Their support was incredible!",
    textRu: "MyDiploma воплотила мою мечту об обучении в Гарварде в реальность. Их поддержка была невероятной!",
    textUz: "MyDiploma Garvardda o'qish orzuimni amalga oshirdi. Ularning qo'llab-quvvatlashi ajoyib edi!",
    image: "/professional-woman-ceo.png",
  },
  {
    name: "Michael Chen",
    nameRu: "Майкл Чен",
    nameUz: "Maykl Chen",
    university: "Oxford University",
    universityRu: "Оксфордский университет",
    universityUz: "Oksford universiteti",
    text: "The guidance I received was exceptional. I'm now studying my dream course at Oxford!",
    textRu: "Руководство, которое я получил, было исключительным. Теперь я изучаю курс своей мечты в Оксфорде!",
    textUz: "Men olgan yo'l-yo'riq ajoyib edi. Endi men Oksfordda orzu qilgan kursimni o'qiyapman!",
    image: "/professional-man-admissions.jpg",
  },
  {
    name: "Emma Williams",
    nameRu: "Эмма Уильямс",
    nameUz: "Emma Uilyams",
    university: "MIT",
    universityRu: "МТИ",
    universityUz: "MIT",
    text: "Professional, reliable, and truly caring. MyDiploma exceeded all my expectations!",
    textRu: "Профессионально, надежно и по-настоящему заботливо. MyDiploma превзошла все мои ожидания!",
    textUz: "Professional, ishonchli va chinakam g'amxo'r. MyDiploma barcha kutganlarimdan oshib ketdi!",
    image: "/professional-woman-director.png",
  },
]

export function TestimonialsSection() {
  const { t, locale } = useLanguage()
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.home.testimonials.title}</h2>
          <p className="text-xl text-muted-foreground">{t.home.testimonials.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      {locale === "ru" ? testimonial.nameRu : locale === "uz" ? testimonial.nameUz : testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {locale === "ru"
                        ? testimonial.universityRu
                        : locale === "uz"
                          ? testimonial.universityUz
                          : testimonial.university}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {locale === "ru" ? testimonial.textRu : locale === "uz" ? testimonial.textUz : testimonial.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
